"use client";

import React from 'react';

interface FormattedQuestionTextProps {
    text: string;
    className?: string;
}

// Parse "Match... Column I 1. A 2. B Column II X. P Y. Q" style questions
function tryParseColumnMatch(text: string) {
    const match = text.match(/^([\s\S]*?)\s+Column\s+I\s+((?:\d+\.[\s\S]+?)(?:\s+\d+\.[\s\S]+?)*)\s+Column\s+II\s+((?:[A-Z]\.[\s\S]+?)(?:\s+[A-Z]\.[\s\S]+?)*)\s*$/);
    if (!match) return null;

    const [, intro, col1Raw, col2Raw] = match;
    const col1Items = col1Raw.trim().split(/\s+(?=\d+\.)/).map(s => s.trim());
    const col2Items = col2Raw.trim().split(/\s+(?=[A-Z]\.)/).map(s => s.trim());

    if (col1Items.length < 2 || col2Items.length < 2) return null;
    return { intro: intro.trim(), col1Items, col2Items };
}

// Parse inline numbered statements: "intro: 1. item 2. item 3. item closing question?"
function tryParseNumberedList(text: string) {
    // Require at least " 1. " and " 2. " (space before number prevents matching "Rule 1." mid-word)
    const pattern = /(?<=[\s:])(\d+)\.\s/g;
    const allMatches = [...text.matchAll(pattern)];
    if (allMatches.length < 2) return null;

    // Build sequential run starting at 1
    const runMatches: RegExpMatchArray[] = [];
    for (const m of allMatches) {
        const num = parseInt(m[1]);
        if (num === runMatches.length + 1) {
            runMatches.push(m);
        }
    }
    if (runMatches.length < 2 || parseInt(runMatches[0][1]) !== 1) return null;

    const intro = text.slice(0, runMatches[0].index).trim();

    // Extract item content between sequential matches
    const items: string[] = [];
    for (let i = 0; i < runMatches.length; i++) {
        const contentStart = runMatches[i].index! + runMatches[i][0].length;
        const contentEnd = i + 1 < runMatches.length ? runMatches[i + 1].index! : text.length;
        const content = text.slice(contentStart, contentEnd).trim();
        if (content.length < 5) return null; // Sanity check: real items are long
        items.push(content);
    }

    // Detect closing question embedded in last item (e.g. "...cease to operate. Which of the above...")
    const closingRe = /\s+(Which\s+of|How\s+many|Select\s+(?:the|only|all)|Choose\s+the)/;
    const lastItem = items[items.length - 1];
    const closingMatch = lastItem.match(closingRe);
    let closing = '';

    if (closingMatch && closingMatch.index !== undefined) {
        closing = lastItem.slice(closingMatch.index).trim();
        items[items.length - 1] = lastItem.slice(0, closingMatch.index).trim();
    }

    return { intro, items, closing };
}

// Render a markdown pipe-table string
function MarkdownTable({ raw, idx }: { raw: string; idx: number }) {
    const lines = raw.trim().split(/\r?\n/);
    const rows = lines
        .filter(l => !l.includes('| ---') && !l.includes('|---'))
        .map(l => {
            const cells = l.split('|').map(c => c.trim());
            if (cells[0] === '') cells.shift();
            if (cells[cells.length - 1] === '') cells.pop();
            return cells;
        })
        .filter(r => r.length > 0);

    if (rows.length === 0) return null;
    const [headers, ...dataRows] = rows;

    return (
        <div className="overflow-hidden my-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900/50">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
                <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                        {headers.map((h, i) => (
                            <th key={i} className="px-4 py-3 font-bold text-zinc-900 dark:text-zinc-100 border-r last:border-r-0 border-zinc-200 dark:border-zinc-800">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {dataRows.map((row, i) => (
                        <tr key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                            {row.map((cell, j) => (
                                <td key={j} className="px-4 py-3 text-zinc-700 dark:text-zinc-300 font-medium border-r last:border-r-0 border-zinc-100 dark:border-zinc-800">{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function FormattedQuestionText({ text, className = "" }: FormattedQuestionTextProps) {
    // 1. Handle markdown pipe-tables
    const tableRegex = /((?:^\|.*\|(?:\r?\n|$)){2,})/gm;
    const tableParts = text.split(tableRegex);

    if (tableParts.length > 1) {
        return (
            <div className={`space-y-4 ${className}`}>
                {tableParts.map((part, index) => {
                    if (part.trim().startsWith('|') && part.trim().endsWith('|') && (part.includes('| ---') || part.includes('|---'))) {
                        return <MarkdownTable key={index} raw={part} idx={index} />;
                    }
                    const trimmed = part.trim();
                    if (!trimmed) return null;
                    return <p key={index} className="whitespace-pre-wrap">{trimmed}</p>;
                })}
            </div>
        );
    }

    // 2. Handle Column I / Column II matching questions (check before numbered list)
    const colMatch = tryParseColumnMatch(text);
    if (colMatch) {
        const { intro, col1Items, col2Items } = colMatch;
        const maxRows = Math.max(col1Items.length, col2Items.length);
        return (
            <div className={`space-y-3 ${className}`}>
                {intro && <p className="whitespace-pre-wrap">{intro}</p>}
                <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900/50">
                    <table className="w-full text-xs md:text-sm border-collapse">
                        <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
                            <tr>
                                <th className="px-4 py-3 font-bold text-zinc-900 dark:text-zinc-100 border-r border-zinc-200 dark:border-zinc-800 w-1/2 text-left">Column I</th>
                                <th className="px-4 py-3 font-bold text-zinc-900 dark:text-zinc-100 w-1/2 text-left">Column II</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {Array.from({ length: maxRows }).map((_, i) => (
                                <tr key={i}>
                                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300 border-r border-zinc-100 dark:border-zinc-800 align-top">
                                        {col1Items[i] ?? ''}
                                    </td>
                                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300 align-top">
                                        {col2Items[i] ?? ''}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    // 3. Handle inline numbered statement lists
    const listParsed = tryParseNumberedList(text);
    if (listParsed) {
        const { intro, items, closing } = listParsed;
        return (
            <div className={`space-y-3 ${className}`}>
                {intro && <p className="whitespace-pre-wrap">{intro}</p>}
                <ol className="space-y-2 pl-0 list-none">
                    {items.map((item, i) => (
                        <li key={i} className="flex gap-2.5 items-start">
                            <span className="font-semibold text-zinc-800 dark:text-zinc-200 shrink-0 min-w-[1.5rem]">{i + 1}.</span>
                            <span className="text-zinc-700 dark:text-zinc-300">{item}</span>
                        </li>
                    ))}
                </ol>
                {closing && <p className="whitespace-pre-wrap font-medium text-zinc-800 dark:text-zinc-200">{closing}</p>}
            </div>
        );
    }

    // 4. Plain text fallback
    return <p className={`whitespace-pre-wrap ${className}`}>{text}</p>;
}
