# AI Coding Tip 017 - Ask for the Analyst, Not the Analysis

![AI Coding Tip 017 - Ask for the Analyst, Not the Analysis](AI%20Coding%20Tip%20017%20-%20Ask%20for%20the%20Analyst,%20Not%20the%20Analysis.png)

*When you have a lot of data to analyze, Ask for a tool, not a summary.*

> TL;DR: Ask the AI to write a program that analyzes your data instead of pasting all your data into the prompt.

# Common Mistake ❌

You have 50 complex JSON files.

You paste them all into the chat and ask:

> Find all users whose orders exceeded $500 in Q3.

The AI struggles.

It hits context limits.

It misses records.

It gives you a [hallucinated summary](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md) with silent errors.

You don't get analysis.

You get a probabilistic guess.

# Problems Addressed 😔

- **Context window overflow.** Large datasets exceed what the model can [hold in memory](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context/readme.md).

It silently drops data.

- **Silent hallucination.** The AI fills gaps with invented numbers when data doesn't fit.

You can't tell which results are real.

- **No reproducibility.** You can't re-run the same "analysis" tomorrow on new data.

Each chat is a one-shot lottery.

- **No auditability.** You can't verify *how* the AI reached each conclusion.

There is no code trail and debugging.

- **Wasted tokens.** You burn your context window on raw data the model can only partially process.

- **Non-scalable workflow.** When you get 50 more JSON files next week, you start from scratch.

# How to Do It 🛠️

1. Describe your data shape to the AI, not the data itself. Tell it the JSON structure, field names, and types.

2. State your analysis goal clearly and precisely. ("Find users with total order value > $500 in Q3 2024.")

3. Ask for a program in your preferred language that reads the files from disk and performs the analysis.

4. [Review the generated code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md) before running it.

5. Run it locally on your real data.

6. Iterate. Ask the AI to refine the program if the output needs adjustments.

# Benefits 🎯

- **Unlimited data size.** Your program reads files from disk.

It doesn't care if you have 5 files or 5,000.

- **Reproducible results.** You run the same script every week on fresh data and get consistent, verifiable output.

- **Full auditability.** You read the code.

You know *exactly* what logic produced each result.

- **Zero hallucination risk on data.** The program reads your actual files.

It doesn't invent values.

- **Speed.** A script can process 1,000 JSONs in seconds.

A prompt processes them... poorly.

- **Trust.** You can ask a local tool to find empty folders.

You can also ask for a script to validate them giving examples.

- **Coverage.** You cover your solution and can iterate it later without breaking it.  

- **Reusability.** You own the script.

Modify it, schedule it, version-control it, test it, iterate it, share it.

# Context 🧠

LLMs are text predictors with a finite context window.

Dumping data into a prompt treats the AI like a database.

It is not a database.

It is a code generator.

Use it as one.

The right mental model: the AI is your senior developer.

You describe the problem.

It writes the tool.

You run the tool.

This pattern scales.

The data-dump pattern doesn't.

## Prompt Reference 📝

## Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/d6c93afd2fc2674604e01819b82e2a9e) -->

```markdown
Here are my 12 JSON files with order data. Each one has
hundreds of records. [pastes 8,000 lines of JSON]

Which users spent more than $500 in Q3?

# You overwhelm the context window. 
# The AI summarizes, guesses, and hallucinates. 
# You can't verify any result. 
# You can't repeat the analysis tomorrow.
```

## Good Prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/df2e153ebdf81883783a58e0dc32b9be) -->

```markdown
I have a folder with multiple JSON files.
Each file represents one month of orders.

Each JSON has this structure:

{
  "month": "2024-07",
  "orders": [
    {
      "order_id": "ORD-001",
      "user": {
        "name": "Lio Messi",
        "country": "AR"
      },
      "items": [
        {
          "product_id": "PROD-7",
          "name": "Soccer Ball",
          "qty": 2,
          "unit_price": 49.99
        }
      ],
      "status": "completed",
      "created_at": "2022-12-18T12:30:00Z"
    }
  ]
}

Write a Python script that:
1. Reads all .json files from a given folder path
2. Filters orders from Q3 2024 (July, August, September)
3. Computes the total spent per user_id
   (sum of qty by unit_price for completed orders)
4. Prints users whose total exceeds $500, sorted descending
5. Exports the result to a CSV file named q3_top_users.csv

Use pathlib and the standard csv module. No dependencies.

# You describe the shape of the data, not the data itself.
# The AI writes a reliable, auditable, reusable program.
# You run it on your real files.
```

# Considerations ⚠️

Schema accuracy matters.

If you describe the wrong structure, the AI generates code with wrong field names.

Check the generated code against a real sample record.

Edge cases need explicit mention.

Tell the AI about optional keys, inconsistent date formats.

("The `status` field can be null in some older records.")

Large cross-file joins need memory planning.

Ask the AI to use streaming or chunk-based reads for very large files (>1 GB).

Mention the file size.

This doesn't replace exploratory analysis.

When you genuinely don't know your data shape yet, pasting a *small sample* (5–10 records) into the prompt is fine. 

Use that to understand the shape, then switch to the program approach.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

- The generated program needs a local executable environment to run.

- Schema descriptions must be accurate.

- Bad schema → broken code.

- Always verify with a real record.

- The AI may not handle deeply nested or polymorphic JSON structures without extra hints.

- Add examples of edge-case shapes to your prompt.

# Tags 🏷️

- Context Window

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 006 - Review Every Line Before Commit](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md)

[AI Coding Tip 009 - Compact Your Context](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context/readme.md)

[AI Coding Tip 010 - Access All Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20010%20-%20Access%20All%20Your%20Code/readme.md)

[AI Coding Tip 015 - Force the AI to Obey You](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md)

# Conclusion 🏁

The AI is not a spreadsheet.

It is not a database.

It is a code generator that never gets tired.

When you need to analyze data, you describe the shape of your data and the goal of your analysis.

The AI writes the tool.

You run the tool on real data.

You get verifiable, reproducible, auditable results.

You keep the script.

You run it again next month.

That is how you use AI for data work. 🏁

# More Information ℹ️

[Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172)

[Self-planning Code Generation with Large Language Models](https://arxiv.org/abs/2303.06689)

# Also Known As 🎭

- Generate the tool, run the tool
- Ask for the analyzer, not the analysis
- Data-driven code generation
- Program the solution, don't paste the data

# Tools 🧰

- Local or cloud development tools

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans. 

I use AI proofreading tools to improve some texts.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

* * *

This article is part of the *AI Coding Tip* series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)