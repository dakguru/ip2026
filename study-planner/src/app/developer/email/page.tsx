"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Mail,
    Send,
    Users,
    Eye,
    Loader2,
    CheckCircle2,
    AlertCircle,
    ChevronDown,
    Sparkles,
    FlaskConical,
    X,
    Save,
    Trash2,
} from "lucide-react";

// ----- Email Templates -----
const EMAIL_TEMPLATES = [
    {
        id: "blank",
        name: "Blank Email",
        subject: "",
        html: "",
    },
    {
        id: "announcement",
        name: "📢 Announcement",
        subject: "Important Update from Dak Guru",
        html: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
  <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 40px 30px; text-align: center; color: white;">
    <div style="font-size: 28px; font-weight: 800; letter-spacing: 1px; margin-bottom: 8px;">Dak Guru</div>
    <div style="font-size: 14px; opacity: 0.85; text-transform: uppercase; letter-spacing: 2px;">Important Announcement</div>
  </div>
  <div style="padding: 40px 30px;">
    <p style="font-size: 18px; color: #1e293b; margin-bottom: 20px;">Hello <strong>{{name}}</strong>,</p>
    <p style="color: #475569; line-height: 1.7; font-size: 15px;">We have an important update to share with you. Please read the details below.</p>
    <div style="background: #f1f5f9; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
      <p style="color: #334155; margin: 0; font-size: 15px;">Your announcement content goes here...</p>
    </div>
    <p style="color: #475569; line-height: 1.7; font-size: 15px;">If you have any questions, feel free to reach out to us.</p>
    <p style="color: #475569; margin-top: 30px;">Best regards,<br><strong style="color: #1e3a8a;">Team Dak Guru</strong></p>
  </div>
  <div style="background: #f8fafc; padding: 20px 30px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0;">
    &copy; ${new Date().getFullYear()} Dak Guru Study Planner. All rights reserved.
  </div>
</div>`,
    },
    {
        id: "mock-test",
        name: "📝 Mock Test Reminder",
        subject: "Mock Test Starting Soon – Don't Miss It!",
        html: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
  <div style="background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%); padding: 40px 30px; text-align: center; color: white;">
    <div style="font-size: 28px; font-weight: 800; letter-spacing: 1px; margin-bottom: 8px;">Dak Guru</div>
    <div style="font-size: 14px; opacity: 0.85; text-transform: uppercase; letter-spacing: 2px;">Mock Test Reminder</div>
  </div>
  <div style="padding: 40px 30px;">
    <p style="font-size: 18px; color: #1e293b; margin-bottom: 20px;">Hello <strong>{{name}}</strong>,</p>
    <p style="color: #475569; line-height: 1.7; font-size: 15px;">This is a friendly reminder that our next mock test is scheduled soon. Make sure you are prepared!</p>
    <div style="background: linear-gradient(135deg, #faf5ff, #ede9fe); border: 2px dashed #7c3aed; border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
      <div style="font-size: 12px; font-weight: 700; color: #6d28d9; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">📅 Test Schedule</div>
      <div style="font-size: 20px; font-weight: 800; color: #4c1d95;">[Date & Time Here]</div>
    </div>
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://www.dakguru.com/mock-tests" style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #6d28d9); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);">View Mock Tests →</a>
    </div>
    <p style="color: #475569; margin-top: 24px;">Best of luck!<br><strong style="color: #4c1d95;">Team Dak Guru</strong></p>
  </div>
  <div style="background: #f8fafc; padding: 20px 30px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0;">
    &copy; ${new Date().getFullYear()} Dak Guru Study Planner. All rights reserved.
  </div>
</div>`,
    },
    {
        id: "offer",
        name: "🎉 Special Offer",
        subject: "Exclusive Offer Just for You – Limited Time!",
        html: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
  <div style="background: linear-gradient(135deg, #dc2626 0%, #f97316 100%); padding: 40px 30px; text-align: center; color: white;">
    <div style="font-size: 28px; font-weight: 800; letter-spacing: 1px; margin-bottom: 8px;">Dak Guru</div>
    <div style="font-size: 14px; opacity: 0.85; text-transform: uppercase; letter-spacing: 2px;">🎉 Special Offer</div>
  </div>
  <div style="padding: 40px 30px;">
    <p style="font-size: 18px; color: #1e293b; margin-bottom: 20px;">Hello <strong>{{name}}</strong>,</p>
    <p style="color: #475569; line-height: 1.7; font-size: 15px;">We have a special offer exclusively for you! Don't miss this limited-time opportunity.</p>
    <div style="background: linear-gradient(to right, #fef3c7, #fee2e2); border: 2px dashed #f59e0b; border-radius: 12px; padding: 30px; margin: 24px 0; text-align: center;">
      <div style="font-size: 12px; font-weight: 700; color: #b45309; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Your Exclusive Offer</div>
      <div style="font-size: 32px; font-weight: 900; color: #dc2626; letter-spacing: 2px;">[OFFER DETAILS]</div>
    </div>
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://www.dakguru.com/pricing" style="display: inline-block; background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);">Claim Offer →</a>
    </div>
    <p style="color: #94a3b8; font-size: 13px; text-align: center; margin-top: 16px;"><em>Valid for a limited time only.</em></p>
    <p style="color: #475569; margin-top: 24px;">Warm regards,<br><strong style="color: #dc2626;">Team Dak Guru</strong></p>
  </div>
  <div style="background: #f8fafc; padding: 20px 30px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0;">
    &copy; ${new Date().getFullYear()} Dak Guru Study Planner. All rights reserved.
  </div>
</div>`,
    },
    {
        id: "update",
        name: "🔄 New Feature Update",
        subject: "New Feature Alert – Check Out What's New!",
        html: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
  <div style="background: linear-gradient(135deg, #059669 0%, #34d399 100%); padding: 40px 30px; text-align: center; color: white;">
    <div style="font-size: 28px; font-weight: 800; letter-spacing: 1px; margin-bottom: 8px;">Dak Guru</div>
    <div style="font-size: 14px; opacity: 0.85; text-transform: uppercase; letter-spacing: 2px;">🚀 What's New</div>
  </div>
  <div style="padding: 40px 30px;">
    <p style="font-size: 18px; color: #1e293b; margin-bottom: 20px;">Hello <strong>{{name}}</strong>,</p>
    <p style="color: #475569; line-height: 1.7; font-size: 15px;">We're excited to share some new features and improvements we've been working on!</p>
    <div style="margin: 24px 0;">
      <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 16px;">
        <div style="background: #ecfdf5; color: #059669; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0;">✓</div>
        <div>
          <div style="font-weight: 700; color: #1e293b; margin-bottom: 4px;">Feature 1</div>
          <div style="color: #64748b; font-size: 14px;">Description of the feature...</div>
        </div>
      </div>
      <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 16px;">
        <div style="background: #ecfdf5; color: #059669; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0;">✓</div>
        <div>
          <div style="font-weight: 700; color: #1e293b; margin-bottom: 4px;">Feature 2</div>
          <div style="color: #64748b; font-size: 14px;">Description of the feature...</div>
        </div>
      </div>
    </div>
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://www.dakguru.com" style="display: inline-block; background: linear-gradient(135deg, #059669, #047857); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);">Explore Now →</a>
    </div>
    <p style="color: #475569; margin-top: 24px;">Happy studying!<br><strong style="color: #059669;">Team Dak Guru</strong></p>
  </div>
  <div style="background: #f8fafc; padding: 20px 30px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0;">
    &copy; ${new Date().getFullYear()} Dak Guru Study Planner. All rights reserved.
  </div>
</div>`,
    },
];

export default function EmailComposePage() {
    const [subject, setSubject] = useState("");
    const [htmlBody, setHtmlBody] = useState("");
    const [courseMode, setCourseMode] = useState("all");
    const [membershipLevel, setMembershipLevel] = useState("all");
    const [testEmail, setTestEmail] = useState("");
    const [recipientCount, setRecipientCount] = useState<number | null>(null);
    const [sampleRecipients, setSampleRecipients] = useState<{ email: string; name: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [result, setResult] = useState<{
        success: boolean;
        message: string;
        totalSent?: number;
        totalFailed?: number;
    } | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState("blank");
    const [draftSaved, setDraftSaved] = useState(false);
    const [savedDrafts, setSavedDrafts] = useState<{ id: string, subject: string, html: string, timestamp: number }[]>([]);

    // Load draft on mount
    useEffect(() => {
        try {
            const draftsStr = localStorage.getItem("email_drafts_list");
            if (draftsStr) {
                setSavedDrafts(JSON.parse(draftsStr));
            } else {
                // Migrate old draft if exists
                const oldSub = localStorage.getItem("email_draft_subject");
                const oldBody = localStorage.getItem("email_draft_body");
                if (oldSub || oldBody) {
                    const migrated = [{ id: Date.now().toString(), subject: oldSub || "", html: oldBody || "", timestamp: Date.now() }];
                    setSavedDrafts(migrated);
                    localStorage.setItem("email_drafts_list", JSON.stringify(migrated));
                    localStorage.removeItem("email_draft_subject");
                    localStorage.removeItem("email_draft_body");
                }
            }
        } catch (e) {
            console.error("Failed to load drafts", e);
        }
    }, []);

    // Save draft
    const handleSaveDraft = () => {
        if (!subject && !htmlBody) return;
        const newDraft = { id: Date.now().toString(), subject, html: htmlBody, timestamp: Date.now() };
        const updatedDrafts = [newDraft, ...savedDrafts].slice(0, 10);
        setSavedDrafts(updatedDrafts);
        localStorage.setItem("email_drafts_list", JSON.stringify(updatedDrafts));
        setDraftSaved(true);
        setTimeout(() => setDraftSaved(false), 2000);
    };

    const loadDraft = (draft: { subject: string, html: string }) => {
        setSubject(draft.subject);
        setHtmlBody(draft.html);
        setSelectedTemplate("draft");
    };

    const deleteDraft = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const updatedDrafts = savedDrafts.filter((d) => d.id !== id);
        setSavedDrafts(updatedDrafts);
        localStorage.setItem("email_drafts_list", JSON.stringify(updatedDrafts));
    };

    // Fetch recipient count on filter change
    const fetchRecipientCount = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (courseMode !== "all") params.set("courseMode", courseMode);
            if (membershipLevel !== "all") params.set("membershipLevel", membershipLevel);

            const res = await fetch(`/api/developer/email/send?${params.toString()}`);
            const data = await res.json();
            if (res.ok) {
                setRecipientCount(data.count);
                setSampleRecipients(data.sampleRecipients || []);
            }
        } catch (err) {
            console.error("Failed to fetch count:", err);
        }
        setLoading(false);
    }, [courseMode, membershipLevel]);

    useEffect(() => {
        fetchRecipientCount();
    }, [fetchRecipientCount]);

    // Apply template
    const applyTemplate = (templateId: string) => {
        setSelectedTemplate(templateId);
        const template = EMAIL_TEMPLATES.find((t) => t.id === templateId);
        if (template) {
            setSubject(template.subject);
            setHtmlBody(template.html);
        }
    };

    // Send test email
    const handleSendTest = async () => {
        if (!testEmail || !subject) return;
        setSending(true);
        setResult(null);
        try {
            const res = await fetch("/api/developer/email/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    subject,
                    htmlBody,
                    textBody: htmlBody ? undefined : "Please view in an HTML email client.",
                    testEmail,
                }),
            });
            const data = await res.json();
            setResult({ success: res.ok, message: data.message || data.error });
        } catch (err: any) {
            setResult({ success: false, message: err.message });
        }
        setSending(false);
    };

    // Send to all
    const handleSendAll = async () => {
        setShowConfirm(false);
        setSending(true);
        setResult(null);
        try {
            const recipientFilter: any = {};
            if (courseMode !== "all") recipientFilter.courseMode = courseMode;
            if (membershipLevel !== "all") recipientFilter.membershipLevel = membershipLevel;

            const res = await fetch("/api/developer/email/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    subject,
                    htmlBody,
                    textBody: htmlBody ? undefined : "Please view in an HTML email client.",
                    recipientFilter: Object.keys(recipientFilter).length > 0 ? recipientFilter : undefined,
                }),
            });
            const data = await res.json();
            setResult({
                success: res.ok,
                message: data.message || data.error,
                totalSent: data.totalSent,
                totalFailed: data.totalFailed,
            });
        } catch (err: any) {
            setResult({ success: false, message: err.message });
        }
        setSending(false);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 md:p-8 transition-colors">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/developer"
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Developer CMS
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white shadow-lg shadow-blue-500/20">
                            <Mail className="w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
                                Email Composer
                            </h1>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Send emails to users as{" "}
                                <span className="font-mono text-blue-600 dark:text-blue-400">admin@dakguru.com</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* ===== LEFT COLUMN: Compose Form ===== */}
                    <div className="lg:col-span-2 space-y-5">
                        {/* Template Picker */}
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                                <Sparkles className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                                Email Template
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                                {EMAIL_TEMPLATES.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => applyTemplate(t.id)}
                                        className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                                            selectedTemplate === t.id
                                                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 ring-2 ring-blue-200 dark:ring-blue-800"
                                                : "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-750"
                                        }`}
                                    >
                                        {t.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Saved Drafts */}
                        {savedDrafts.length > 0 && (
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                                    <Save className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                                    Saved Drafts
                                </label>
                                <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                                    {savedDrafts.map((draft) => (
                                        <div
                                            key={draft.id}
                                            onClick={() => loadDraft(draft)}
                                            className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800 cursor-pointer transition-all group"
                                        >
                                            <div className="overflow-hidden mr-3">
                                                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                                                    {draft.subject || "Untitled Draft"}
                                                </div>
                                                <div className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                    {new Date(draft.timestamp).toLocaleString()}
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => deleteDraft(draft.id, e)}
                                                className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                                                title="Delete Draft"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Subject */}
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                                Subject Line
                            </label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Enter email subject..."
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm font-medium"
                            />
                        </div>

                        {/* HTML Body */}
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                    HTML Body
                                </label>
                                <button
                                    onClick={() => setShowPreview(!showPreview)}
                                    className="flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
                                >
                                    <Eye className="w-3.5 h-3.5" />
                                    {showPreview ? "Hide Preview" : "Show Preview"}
                                </button>
                            </div>
                            <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-3">
                                Use <code className="text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-1.5 py-0.5 rounded">{"{{name}}"}</code> to
                                personalise with the recipient&apos;s name.
                            </p>
                            <textarea
                                value={htmlBody}
                                onChange={(e) => setHtmlBody(e.target.value)}
                                rows={16}
                                placeholder="<div>Your HTML email content here...</div>"
                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-xs leading-relaxed resize-y"
                            />
                        </div>

                        {/* HTML Preview */}
                        {showPreview && htmlBody && (
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                                <div className="px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 flex items-center gap-2">
                                    <Eye className="w-4 h-4 text-zinc-500" />
                                    <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                        Email Preview
                                    </span>
                                </div>
                                <div className="p-6">
                                    <div
                                        className="email-preview"
                                        dangerouslySetInnerHTML={{
                                            __html: htmlBody.replace(/\{\{name\}\}/gi, "John Doe"),
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ===== RIGHT COLUMN: Controls ===== */}
                    <div className="space-y-5">
                        {/* Recipient Filters */}
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Users className="w-4 h-4 text-zinc-500" />
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Recipients</h3>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1 block">
                                        Course Mode
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={courseMode}
                                            onChange={(e) => setCourseMode(e.target.value)}
                                            className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="all">All Users</option>
                                            <option value="LDCE_IP">LDCE IP</option>
                                            <option value="PS_GR_B">PS Group B</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1 block">
                                        Membership Level
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={membershipLevel}
                                            onChange={(e) => setMembershipLevel(e.target.value)}
                                            className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="all">All Levels</option>
                                            <option value="free">Free</option>
                                            <option value="silver">Silver</option>
                                            <option value="gold">Gold</option>
                                            <option value="diamond">Diamond</option>
                                            <option value="platinum">Platinum</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Recipient Count */}
                            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/15 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                {loading ? (
                                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span className="text-sm">Counting...</span>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                            <span className="text-2xl font-extrabold text-blue-700 dark:text-blue-300">
                                                {recipientCount ?? "–"}
                                            </span>
                                            <span className="text-xs text-blue-500 dark:text-blue-400 font-medium">
                                                recipients
                                            </span>
                                        </div>
                                        {sampleRecipients.length > 0 && (
                                            <div className="mt-2 space-y-1">
                                                {sampleRecipients.map((r, i) => (
                                                    <div
                                                        key={i}
                                                        className="text-xs text-blue-600/70 dark:text-blue-400/60 truncate"
                                                    >
                                                        {r.name} — {r.email}
                                                    </div>
                                                ))}
                                                {recipientCount && recipientCount > 5 && (
                                                    <div className="text-xs text-blue-400 dark:text-blue-500 italic">
                                                        ...and {recipientCount - 5} more
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Test Email */}
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <FlaskConical className="w-4 h-4 text-amber-500" />
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Send Test Email</h3>
                            </div>
                            <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-3">
                                Preview how the email looks before sending to everyone.
                            </p>
                            <input
                                type="email"
                                value={testEmail}
                                onChange={(e) => setTestEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 mb-3"
                            />
                            <button
                                onClick={handleSendTest}
                                disabled={sending || !testEmail || !subject}
                                className="w-full py-2.5 px-4 rounded-lg bg-amber-50 dark:bg-amber-900/15 text-amber-700 dark:text-amber-400 font-semibold text-sm border border-amber-200 dark:border-amber-800/50 hover:bg-amber-100 dark:hover:bg-amber-900/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <FlaskConical className="w-4 h-4" />}
                                Send Test
                            </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
                            <button
                                onClick={handleSaveDraft}
                                className="w-full py-2.5 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold text-sm transition-all flex items-center justify-center gap-2"
                            >
                                {draftSaved ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Save className="w-4 h-4" />}
                                {draftSaved ? "Draft Saved!" : "Save Draft"}
                            </button>
                            <button
                                onClick={() => setShowConfirm(true)}
                                disabled={sending || !subject || !htmlBody || !recipientCount}
                                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all flex items-center justify-center gap-2"
                            >
                                {sending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" /> Send to All ({recipientCount ?? 0}) Users
                                    </>
                                )}
                            </button>
                            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 text-center">
                                This action cannot be undone. Use the test email first.
                            </p>
                        </div>

                        {/* Result Banner */}
                        {result && (
                            <div
                                className={`rounded-2xl p-4 border shadow-sm ${
                                    result.success
                                        ? "bg-emerald-50 dark:bg-emerald-900/15 border-emerald-200 dark:border-emerald-800/50"
                                        : "bg-red-50 dark:bg-red-900/15 border-red-200 dark:border-red-800/50"
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    {result.success ? (
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                    ) : (
                                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p
                                            className={`text-sm font-semibold ${
                                                result.success
                                                    ? "text-emerald-800 dark:text-emerald-300"
                                                    : "text-red-800 dark:text-red-300"
                                            }`}
                                        >
                                            {result.message}
                                        </p>
                                        {result.totalSent !== undefined && (
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                                ✅ Sent: {result.totalSent} | ❌ Failed: {result.totalFailed}
                                            </p>
                                        )}
                                    </div>
                                    <button onClick={() => setResult(null)} className="text-zinc-400 hover:text-zinc-600 transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ===== Confirmation Modal ===== */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Confirm Bulk Send</h3>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-2">
                            You are about to send this email to{" "}
                            <strong className="text-red-600 dark:text-red-400">{recipientCount}</strong> users.
                        </p>
                        <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg mb-4">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Subject:</p>
                            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{subject}</p>
                        </div>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-4">
                            This action <strong>cannot</strong> be undone. Please make sure you have tested the email first.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 py-2.5 px-4 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 font-semibold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSendAll}
                                className="flex-1 py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors shadow-sm"
                            >
                                Yes, Send to All
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
