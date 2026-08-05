# AI Coding Tip 028 - Build a Company Brain

![AI Coding Tip 028 - Build a Company Brain](AI%20Coding%20Tip%20028%20-%20Build%20a%20Company%20Brain.png)

*One Second Brain doesn't scale past one skull.*

> TL;DR: Wire a skill into your company's live systems so every answer carries a source and a freshness check.

# Common Mistake ❌

As a single contributor, you can build a personal [Second Brain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20020%20-%20Create%20a%20Second%20Brain/readme.md), and it works beautifully for that one person.

The company's actual knowledge still sits scattered across Confluence, Slack threads, Jira tickets, CMSs, Wikis, Salesforce notes, and a wiki nobody has touched since the last reorg.

Your AI searches your own vault perfectly, then guesses the moment a question needs an answer that lives in a coworker's head, a stale runbook, or a system you never gave it access to.

# Problems Addressed 😔

- Company knowledge fragments across four to a dozen SaaS tools: document stores, chat, issue trackers, and business systems, each with its own [API and its own silo](https://www.atolio.com/blog/the-diversity-of-data-sources-for-rag-in-the-enterprise).

- Individual [Second Brains](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20020%20-%20Create%20a%20Second%20Brain/readme.md) compound personally but don't share, so a new hire repeats the exact search a colleague already ran last month.

- Stale, obsolete documentation answers confidently and wrong, the same way [an obsolete comment lies inside a function](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20183%20-%20Obsolete%20Comments/readme.md), except now hundreds of employees and an AI treat the lie as ground truth.

- Every team wires its own one-off integration to its own AI assistant instead of sharing a connector layer, [duplicating auth, indexing, and permission logic](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2066%20-%20Shotgun%20Surgery/readme.md) per tool.

- Naive integrations flatten access control when they [index everything under one service account](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2014%20-%20God%20Objects/readme.md), so a cited answer can surface a document the requester was never allowed to open.

- Engineers already burn [3 to 10 hours a week hunting for undocumented answers](https://techscribehub.medium.com/why-documentation-debt-will-be-the-new-technical-debt-in-2026-232676ddacc8), a form of [comprehension debt](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20021%20-%20Avoid%20Comprehension%20Debt/readme.md) that works in the same way technical debt does.

- Unreviewed content decay costs companies an [estimated $12.9 million a year](https://knowledge-base.software/guides/knowledge-base-content-audit/) in wasted time and wrong answers.

# How to Do It 🛠️

1. Inventory every system employees actually consult before opening a ticket: wiki (Confluence, Notion, Trello), chat (Slack, Teams), issue tracker (Jira, Linear), code (GitHub, GitLab), CRM (Salesforce, HubSpot), and shared drives (Google Drive, SharePoint).

2. Connect each source through its own [MCP server](https://www.anthropic.com/news/model-context-protocol) instead of a custom API integration per tool, the same [give-the-AI-direct-access pattern](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20010%20-%20Access%20All%20Your%20Code/readme.md) extended with vendor servers like [Atlassian's remote MCP server](https://www.atlassian.com/blog/announcements/remote-mcp-server) or GitHub's.

3. Write [a skill](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md) that declares an explicit persona, such as "[You are the company librarian](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20026%20-%20Assign%20a%20Persona%20to%20Every%20Skill%20Definition/readme.md)," and [lists exactly which MCP tools it may call](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md) for which category of question, so it never guesses the source.

4. [Force the skill](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md) to answer only with a citation attached: source URL, system name, and last-modified date on every fact it returns, never [a paraphrase without the reasoning behind it](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20019%20-%20Tell%20the%20AI%20Why,%20Not%20Just%20What/readme.md).

5. Pass the requester's own identity token through every connector instead of a shared service account, so retrieval respects the exact permission boundary the source system already enforces.

6. Add a [freshness gate](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md) that drops or downweights any document past its review-by date: an outdated Confluence page [lies the same way an old comment does](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20183%20-%20Obsolete%20Comments/readme.md), and it deserves the same don't-trust-it treatment.

7. [Log every wrong or unanswered query](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20016%20-%20Feed%20Your%20PR%20Lessons%20into%20the%20AI%20Brain/readme.md) as a new entry in [the skill's pitfalls file](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20025%20-%20Pair%20Every%20Skill%20With%20a%20Pitfalls%20File/readme.md), so a human fills the missing connector or fixes the stale source instead of the AI silently guessing again next time.

8. [Re-run the skill weekly against a fixed set of golden questions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md) and diff the answers against last week's run, so a silent schema change in one connector doesn't rot the whole Company Brain unnoticed.

9. Turn meetings into text too, since the skill can only reason over what it can read: run a transcription bot on the calls that matter and feed the transcript through the same connector pipeline as everything else.

# Benefits 🎯

1. **Single entry point:** Employees ask one skill instead of hopping across ten browser tabs looking for the same fact.

2. **Attributable answers:** Every response carries a citation, which makes [review as fast as reviewing a diff](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md) instead of trusting a black box.

3. **Access control travels with the query:** The retrieval layer checks permissions against the requester's own identity, instead of flattening them behind a shared index.

4. **Staleness becomes visible:** The freshness gate flags a document past its review date instead of trusting it forever, closing [the same gap an obsolete comment leaves open](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20183%20-%20Obsolete%20Comments/readme.md) inside a function.

5. **Faster onboarding:** New hires ask the Company Brain instead of interrupting five different colleagues with the same question.

6. **Compounding knowledge:** Company-wide knowledge compounds the same way a [personal Second Brain compounds](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20020%20-%20Create%20a%20Second%20Brain/readme.md), except now every employee's queries feed it.

7. **Visible gaps:** An unanswered query becomes a concrete signal that a runbook is missing, instead of silently costing someone an afternoon.

8. **No more knowledge gurus:** The skill breaks the informal silos and single points of knowledge teams route around, since anyone can query the same live sources instead of waiting on the one coworker who remembers.

# Context 🧠

[A Second Brain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20020%20-%20Create%20a%20Second%20Brain/readme.md) is one person's plain Markdown files, disciplined by Tiago Forte's CODE framework and Niklas Luhmann's Zettelkasten, under that person's direct control.

A Company Brain stretches that same idea across a hundred people and a dozen systems nobody individually owns.

The failure mode isn't that people are disorganized.

It's that human memory doesn't scale past the one person who holds it.

That's exactly why [Glean built its product around that name](https://www.phdata.io/blog/how-to-create-a-company-brain-with-glean/): a permissions-aware index over 100+ tools that lets teams ask questions, find experts, and trigger workflows from one surface.

A knowledge silo forms the moment only one system, or one person, holds the answer to a recurring question, and that person becomes a [bus factor risk](https://en.wikipedia.org/wiki/Bus_factor): the team's only path to the answer, until they leave.

A Company Brain breaks both silos and gurus the same way: it distributes the answer across every connector it can query, so the response no longer depends on which system or which coworker happens to be reachable that day.

The company-librarian persona from earlier makes that shift concrete.

A real librarian never invents a shelf location: she looks it up or tells you she doesn't have it yet.

That's the same discipline the persona is supposed to enforce on every answer.

A Company Brain isn't a wiki, and it isn't a CRM.

A wiki decays the moment nobody feels responsible for updating it, and a CRM records what a customer told the company, not what an engineer needs when the customer's real objection never made it into a structured field.

Glean reports its retrieval preferred roughly [twice as often as a general chatbot's company knowledge](https://www.glean.com/blog/enterprise-search-evaluation-2026), which tracks with what [Atolio](https://www.atolio.com/blog/the-diversity-of-data-sources-for-rag-in-the-enterprise) and [Unstructured](https://unstructured.io/blog/enterprise-rag-why-connectors-matter-in-production-systems) describe as the core problem: document stores, chat tools, engineering systems, and business systems each speak a different schema, and someone has to normalize all four into one retrieval stream before an AI can answer honestly.

[MCP](https://www.anthropic.com/news/model-context-protocol) is the plumbing that makes this tractable without a bespoke integration per assistant: each server acts as a gatekeeper to its own system, and the protocol's authorization layer lets a client present the requester's own bearer token so the connector enforces the exact same access policy the source system already has.

A knowledge base, in the sense most RAG products ship, is a copy: a pipeline chunks and embeds your documents into a vector database, and a query searches [that copy by similarity](https://atlan.com/know/llm-wiki-vs-rag-knowledge-base/), not the source system itself.

That copy only stays accurate if something [re-crawls and re-embeds it on a schedule](https://weaviate.io/blog/what-is-agentic-rag), and the gap between a source edit and the next reindex run is exactly the window where a confident, wrong answer slips through, even inside Glean's own permissions-aware index.

The skill from this tip skips that copy entirely: instead of searching a pre-built index, [it calls each MCP connector live at request time](https://www.llamaindex.ai/blog/rag-is-dead-long-live-agentic-retrieval), so one question can query Confluence, Salesforce, and GitHub in the same run and return their current state, not a snapshot from last week's crawl.

That's the real difference between a knowledge base and this Company Brain: a knowledge base is one indexed store you search, while this skill is a router that asks several live systems the same question and merges what comes back, with nothing to fall behind because nothing gets cached in between.

Nobody maintains what can't be executed, and [that rule](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20183%20-%20Obsolete%20Comments/readme.md) applies just as much to a Confluence page as to a `// TODO` comment nobody deleted.

Stale context produces the same practical outcome as hallucination, a confident, fluent, wrong answer, which is why teams now treat freshness fields and stale-source suppression as first-class retrieval concerns, not an afterthought.

A decision nobody wrote down costs the same inside a codebase as inside a company: [the missing rationale](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20168%20-%20Undocumented%20Decisions/readme.md) lives in someone's head until the day that person leaves.

A Company Brain doesn't fix either smell by itself, but it turns both into a retrieval gap you can see and log instead of tribal knowledge you can only rediscover by accident.

A knowledge base is never finished: [content decay is the default failure mode of a wiki at organizational scale](https://knowledge-base.software/guides/knowledge-base-content-audit/), and it decays faster than most teams expect once a product ships a few releases past the last edit.

The fix isn't a bigger vault, it's [governance](https://knowledge-base.software/guides/knowledge-base-governance-framework/): every article gets a named owner, and [review cadence scales with risk the same way a harness enforces standards by severity](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20027%20-%20Force%20Code%20Standards/readme.md), so a billing or permissions page gets reviewed after every release while an evergreen explainer gets reviewed twice a year.

[Docs-as-code](https://konghq.com/blog/learning-center/what-is-docs-as-code) treats documentation like source code and pushes that governance further upstream: version-controlled, [peer-reviewed through the same pull request](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md) your feature ships in, so the page can't drift out of sync with the system it describes.

The 2026 trend goes one step further with [living documentation wired directly into work-management tools](https://www.fastdoc.io/blog/state-of-software-documentation-2026), so closing a ticket auto-scaffolds the release note instead of leaving a human to remember it later.

A Company Brain is downstream of all of this: the fresher the source, the less the retrieval skill has to compensate for a Confluence page or a runbook nobody re-read since it was written.

## Prompt Reference 📝

## Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/6021a1128e2d85d96ee343b593833be7) -->

```markdown
Look through company notes and tell me our current refund policy

for enterprise customers. I don't have the Confluence page

handy, so just use whatever you already know.
```

## Good Prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/98e529662a2bf801e05b1e508212f397) -->

```markdown
Use the company-brain skill. Query Confluence, Salesforce,

and Slack through their MCP connectors for our current

refund policy for enterprise customers. 

Cite the source URL and its last-modified date for every fact, 

and skip any document past its review-by date.
```

# Considerations ⚠️

Don't let the skill become [shadow IT](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20007%20-%20Avoid%20Malicious%20Skills/readme.md) that bypasses your security team's review of each connector.

Every new MCP server is a new access path into a production system.

Redact secrets and PII before indexing anything.

Scope each connector to public channels by default, and tell employees explicitly before you point a connector at anything more private, like email or call recordings.

Treat every connector's token scope as narrower than convenient, never a company-wide service account.

A Company Brain still needs a human owner per source responsible for triaging staleness flags, the same way a codebase needs someone to act on a linter's complaint instead of muting it.

Start with the two or three sources people ask about most, prove the citation and freshness gate work, then expand the connector list.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

Each connector breaks independently when its underlying SaaS API changes, so a Company Brain carries the same maintenance budget as any other production integration.

Running a citation and freshness check on every query costs tokens and latency, which shows up fast at company-wide query volume.

Querying every connector live is slower per question than a single vector search against a pre-built index, since a live approach trades index-refresh lag for round-trip latency to each source system.

A misconfigured freshness gate lets the skill amplify a wrong source faster than a human ever would, so widen its scope only after your golden-question set proves it holds.

When a connector's scope quietly excludes a topic, the skill doesn't say it doesn't know.

It answers anyway, confident and wrong, unless the persona is explicitly told to admit the gap instead of guessing.

# Tags 🏷️

- Knowledge Management

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 010 - Access All Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20010%20-%20Access%20All%20Your%20Code/readme.md)

[AI Coding Tip 019 - Tell the AI Why, Not Just What](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20019%20-%20Tell%20the%20AI%20Why,%20Not%20Just%20What/readme.md)

[AI Coding Tip 020 - Create a Second Brain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20020%20-%20Create%20a%20Second%20Brain/readme.md)

[AI Coding Tip 024 - Force a Criteria Check Before the Task Ends](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md)

[AI Coding Tip 025 - Pair Every Skill With a Pitfalls File](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20025%20-%20Pair%20Every%20Skill%20With%20a%20Pitfalls%20File/readme.md)

[AI Coding Tip 026 - Assign a Persona to Every Skill Definition](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20026%20-%20Assign%20a%20Persona%20to%20Every%20Skill%20Definition/readme.md)

# Conclusion 🏁

Your Second Brain stops at your own skull.

Wire a skill into your company's MCP-connected systems, force every answer to carry a citation and a freshness check, and the same compounding memory that helps one developer starts helping everyone who asks it a question. 🧠

# More Information ℹ️

[How to Create a Company "Brain" with Glean - phData](https://www.phdata.io/blog/how-to-create-a-company-brain-with-glean/)

[Unified Index for Enterprise AI - Glean](https://www.glean.com/product/system-of-context)

[Types of Data Sources for Enterprise RAG - Atolio](https://www.atolio.com/blog/the-diversity-of-data-sources-for-rag-in-the-enterprise)

[Enterprise RAG: Why Connectors Matter in Production Systems - Unstructured](https://unstructured.io/blog/enterprise-rag-why-connectors-matter-in-production-systems)

[Introducing the Model Context Protocol - Anthropic](https://www.anthropic.com/news/model-context-protocol)

[Introducing Atlassian's Remote MCP Server](https://www.atlassian.com/blog/announcements/remote-mcp-server)

[Context Freshness: Keeping AI Agent Context Current - Atlan](https://atlan.com/know/ai-agent/context-freshness/)

[Why Documentation Debt Will Be the New Technical Debt in 2026](https://techscribehub.medium.com/why-documentation-debt-will-be-the-new-technical-debt-in-2026-232676ddacc8)

[Knowledge Base Content Audit Guide](https://knowledge-base.software/guides/knowledge-base-content-audit/)

[Knowledge Base Governance Framework](https://knowledge-base.software/guides/knowledge-base-governance-framework/)

[What is Docs as Code? - Kong](https://konghq.com/blog/learning-center/what-is-docs-as-code)

[The State of Software Documentation 2026 - FastDoc](https://www.fastdoc.io/blog/state-of-software-documentation-2026)

[LLM Wiki vs RAG: The Karpathy Concept and Enterprise Reality - Atlan](https://atlan.com/know/llm-wiki-vs-rag-knowledge-base/)

[What Is Agentic RAG? - Weaviate](https://weaviate.io/blog/what-is-agentic-rag)

[RAG Is Dead, Long Live Agentic Retrieval - LlamaIndex](https://www.llamaindex.ai/blog/rag-is-dead-long-live-agentic-retrieval)

[Bus Factor - Wikipedia](https://en.wikipedia.org/wiki/Bus_factor)

# Also Known As 🎭

- Organizational-Brain
- Enterprise-Knowledge-Graph
- Unified-Company-Search
- Cross-System-RAG

# Tools 🧰

- [Glean](https://www.glean.com/)
- [Atlassian Remote MCP Server](https://www.atlassian.com/blog/announcements/remote-mcp-server)
- [Unstructured](https://unstructured.io/)
- [Onyx](https://onyx.app/)
- [Guru](https://www.getguru.com/)

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans.

I use AI proofreading tools to improve some texts.

Most AI detectors will flag this article as AI-generated. That's expected. It's a technical article. It has a rigid format and clear steps to follow. 

That's exactly the pattern those tools are trained to catch. I've apparently been "writing like an AI" for decades, long before AI existed. This is a technical article, not a novel.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

* * *

This article is part of the *AI Coding Tip* series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)
