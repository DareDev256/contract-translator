# AI API Billing Guide for Teams

> Managing costs when deploying Contract Translator across a team — what to expect from OpenAI, Anthropic, and other LLM providers.

## The Per-Seat Invoice Problem

AI providers like Anthropic generate **separate invoices and receipts for every seat** added to a team account within a billing cycle. Add 5 people mid-month? That's 5 individual invoice emails plus the original account holder's — each with its own receipt, charge line, and proration calculation.

This isn't a bug. It's how usage-based + seat-based hybrid billing works:

| Provider | Billing Model | Invoice Behavior |
|----------|--------------|------------------|
| **OpenAI** | API usage (tokens) + optional seat licenses | Single consolidated invoice for API usage; separate charges per ChatGPT Team seat |
| **Anthropic** | API usage (tokens) + seat licenses | Individual invoice per seat addition within cycle |
| **Google AI** | API usage (tokens) | Consolidated billing through Google Cloud |
| **Azure OpenAI** | Provisioned throughput + tokens | Consolidated through Azure subscription |

## Why This Matters for Contract Translator

This project uses OpenAI's GPT-4 API. When deploying for a team:

- **API keys are shared** — one `OPENAI_API_KEY` serves all users of the deployed app
- **Costs scale with usage**, not seats — 10 users analyzing 5 contracts each = 50 API calls on one key
- **No per-seat billing** for API-only usage — unlike ChatGPT Team or Anthropic Console seats

This means Contract Translator's billing model is simpler than platform seat licenses. But if your team also uses ChatGPT Team or Claude Team alongside this tool, expect the invoice flood.

## Cost Estimation

Approximate per-analysis costs using GPT-4:

| Contract Size | Input Tokens | Output Tokens | Estimated Cost |
|--------------|-------------|--------------|----------------|
| 1-5 pages | ~2,000 | ~3,000 | $0.08–$0.15 |
| 5-20 pages | ~8,000 | ~6,000 | $0.30–$0.50 |
| 20-50 pages | ~20,000 | ~10,000 | $0.70–$1.20 |
| 50+ pages | ~40,000+ | ~15,000+ | $1.50+ |

*Based on GPT-4 pricing at $0.03/1K input, $0.06/1K output. Actual costs vary by model version and contract complexity.*

## Team Deployment Strategies

### Strategy 1: Shared API Key (Simple)

One `OPENAI_API_KEY` in `.env.local`, all users hit the same account.

```
Team Account ──→ Single API Key ──→ Contract Translator ──→ All Users
```

**Pros:** Simple setup, one invoice, easy cost tracking.
**Cons:** No per-user usage attribution, single point of failure if key is revoked.

### Strategy 2: Per-Department Keys (Granular)

Create separate API keys per team/department for cost allocation.

```env
# .env.local — rotate based on deployment target
OPENAI_API_KEY=sk-proj-legal-team-...    # Legal dept key
# OPENAI_API_KEY=sk-proj-finance-...     # Finance dept key
```

**Pros:** Cost attribution by department, independent rate limits.
**Cons:** Multiple deployments or routing logic needed.

### Strategy 3: Usage Caps (Budget Control)

Set monthly spending limits in the OpenAI dashboard to prevent runaway costs.

1. Go to **OpenAI Dashboard → Settings → Limits**
2. Set a **monthly budget** (e.g., $50/month)
3. Set **notification threshold** at 80% (e.g., $40)
4. The API returns `429 Rate Limit` when the cap is hit

## Taming the Invoice Flood

If you're managing Anthropic or OpenAI Team seats and getting buried in per-seat invoices:

1. **Add all seats at once** — batch additions at the start of a billing cycle to minimize mid-cycle proration invoices
2. **Use a shared billing alias** — route invoices to `billing@yourcompany.com` with auto-labeling rules
3. **Email filter template** (Gmail):
   ```
   from:(receipts@openai.com OR billing@anthropic.com)
   → Label: AI-Billing
   → Skip Inbox
   → Auto-archive after 30 days
   ```
4. **Monthly reconciliation** — check the provider dashboard (not individual emails) for the consolidated view
5. **Request consolidated invoices** — enterprise plans on both OpenAI and Anthropic support single monthly invoices; contact sales if you're spending >$1K/month

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | API key with GPT-4 access |

No additional billing-related env vars are needed — cost management happens at the provider dashboard level, not in application code.

## Further Reading

- [OpenAI Usage Dashboard](https://platform.openai.com/usage)
- [OpenAI Pricing](https://openai.com/pricing)
- [Anthropic Pricing](https://www.anthropic.com/pricing)
- [Managing API Keys Best Practices](https://platform.openai.com/docs/guides/safety-best-practices)
