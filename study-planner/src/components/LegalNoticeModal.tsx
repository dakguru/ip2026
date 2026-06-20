"use client";

import React, { useRef, useEffect } from 'react';
import { X, Scale, Shield, BookOpen, FileWarning, Copyright, Users, AlertTriangle, Gavel, ScrollText } from 'lucide-react';

interface LegalNoticeModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseMode?: 'LDCE_IP' | 'PS_GR_B';
}

// Section icon mapping for visual richness
const sectionIcons: Record<number, React.ReactNode> = {
    1: <Shield className="w-4 h-4" />,
    2: <BookOpen className="w-4 h-4" />,
    3: <FileWarning className="w-4 h-4" />,
    4: <ScrollText className="w-4 h-4" />,
    5: <Copyright className="w-4 h-4" />,
    6: <Shield className="w-4 h-4" />,
    7: <Scale className="w-4 h-4" />,
    8: <Users className="w-4 h-4" />,
    9: <Shield className="w-4 h-4" />,
    10: <FileWarning className="w-4 h-4" />,
    11: <AlertTriangle className="w-4 h-4" />,
    12: <BookOpen className="w-4 h-4" />,
    13: <FileWarning className="w-4 h-4" />,
    14: <AlertTriangle className="w-4 h-4" />,
    15: <ScrollText className="w-4 h-4" />,
    16: <Shield className="w-4 h-4" />,
    17: <Scale className="w-4 h-4" />,
    18: <Copyright className="w-4 h-4" />,
    19: <FileWarning className="w-4 h-4" />,
    20: <Gavel className="w-4 h-4" />,
    21: <Scale className="w-4 h-4" />,
    22: <ScrollText className="w-4 h-4" />,
    23: <AlertTriangle className="w-4 h-4" />,
    24: <Gavel className="w-4 h-4" />,
    25: <Users className="w-4 h-4" />,
};

const LegalNoticeModal: React.FC<LegalNoticeModalProps> = ({ isOpen, onClose, courseMode = 'LDCE_IP' }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isPS = courseMode === 'PS_GR_B';

    // Reset scroll position when opened
    useEffect(() => {
        if (isOpen && scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [isOpen]);

    // Close on escape key
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const accent = isPS ? 'teal' : 'purple';

    // Bullet list item component
    const BulletItem = ({ children }: { children: React.ReactNode }) => (
        <li className="flex items-start gap-2 text-[11px] sm:text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <span className={`mt-1.5 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full shrink-0 ${isPS ? 'bg-teal-400' : 'bg-purple-400'}`} />
            <span>{children}</span>
        </li>
    );

    // Section heading component
    const SectionHeading = ({ number, title }: { number: number; title: string }) => (
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 mt-5 sm:mt-8 first:mt-0">
            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 ${isPS ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'}`}>
                {sectionIcons[number] || <ScrollText className="w-3 h-3 sm:w-4 sm:h-4" />}
            </div>
            <h3 className="text-[13px] sm:text-[15px] font-bold text-zinc-800 dark:text-zinc-100">{number}. {title}</h3>
        </div>
    );

    // Paragraph text component
    const Para = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
        <p className={`text-[11px] sm:text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed mb-2 sm:mb-3 ${className}`}>{children}</p>
    );

    // Highlighted box
    const HighlightBox = ({ children }: { children: React.ReactNode }) => (
        <div className={`p-3 sm:p-4 rounded-xl my-3 sm:my-4 ${isPS ? 'bg-teal-50/60 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-800/30' : 'bg-purple-50/60 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/30'}`}>
            {children}
        </div>
    );

    return (
        <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 rounded-t-[1.5rem] sm:rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:animate-in sm:zoom-in-95 duration-200 border-t sm:border border-zinc-200 dark:border-zinc-800 flex flex-col max-h-[95vh] sm:max-h-[90vh]">

                {/* Header */}
                <div className={`relative px-4 py-4 sm:p-8 text-center shrink-0 ${isPS ? 'bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-50 dark:from-teal-900/20 dark:via-cyan-900/10 dark:to-teal-900/20' : 'bg-gradient-to-br from-purple-50 via-fuchsia-50 to-purple-50 dark:from-purple-900/20 dark:via-fuchsia-900/10 dark:to-purple-900/20'}`}>
                    {/* Drag indicator for mobile */}
                    <div className="sm:hidden w-10 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600 mx-auto mb-3" />

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all active:scale-90 shadow-sm border border-zinc-200 dark:border-zinc-700"
                    >
                        <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 dark:text-zinc-400" />
                    </button>

                    {/* Icon */}
                    <div className={`w-11 h-11 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mx-auto mb-2.5 sm:mb-4 flex items-center justify-center shadow-lg ${isPS ? 'bg-gradient-to-br from-teal-500 to-cyan-600' : 'bg-gradient-to-br from-purple-500 to-fuchsia-600'}`}>
                        <Scale className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h2 className="text-base sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-0.5 sm:mb-1">
                        Legal Notice, Copyright &amp; Disclaimer
                    </h2>
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400">
                        <span>Effective: 01.01.2026</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                        <span>Last Updated: 31.12.2025</span>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-8 py-4 sm:py-6 space-y-1 overscroll-contain touch-pan-y" style={{ WebkitOverflowScrolling: 'touch' }}>

                    {/* Preamble */}
                    <HighlightBox>
                        <Para className="mb-0 text-center font-medium text-zinc-700 dark:text-zinc-300">
                            Please read this Legal Notice carefully before accessing, viewing, downloading, printing or using any study material made available through Dak Guru.
                        </Para>
                    </HighlightBox>

                    <Para>
                        For this notice, &ldquo;Dak Guru&rdquo; means the educational platform operated by DG InfoTech (a sole proprietorship) including its website, mobile application, digital services, study materials, question banks and related educational content.
                    </Para>
                    <Para>
                        By accessing or downloading any material from Dak Guru, you acknowledge that you have read and understood this notice and agree to use the material subject to the conditions stated below.
                    </Para>

                    {/* Section 1 */}
                    <SectionHeading number={1} title="Independent and Unofficial Educational Platform" />
                    <Para>Dak Guru is an independent, privately operated examination-preparation and self-learning platform.</Para>
                    <Para>Dak Guru is not a part of, and is not affiliated with, sponsored by, commissioned by, authorised by, approved by or endorsed by:</Para>
                    <ul className="space-y-1.5 mb-3 pl-1">
                        <BulletItem>the Department of Posts;</BulletItem>
                        <BulletItem>India Post;</BulletItem>
                        <BulletItem>the Ministry of Communications;</BulletItem>
                        <BulletItem>the Government of India;</BulletItem>
                        <BulletItem>any examining authority; or</BulletItem>
                        <BulletItem>any other Central or State Government department or organisation.</BulletItem>
                    </ul>
                    <Para>References to Government departments, examinations, cadres, posts, official publications, manuals, handbooks, Acts, Rules, Regulations, circulars or orders are made solely to identify the examination, subject matter or relevant source.</Para>
                    <Para>Nothing published by Dak Guru should be interpreted as an official communication, departmental clarification or Government-approved interpretation.</Para>
                    <Para>All Government names, departmental identities, official emblems, logos, marks and insignia remain the property of their respective owners. Except where expressly authorised, Dak Guru does not claim ownership of or official association with them.</Para>

                    {/* Section 2 */}
                    <SectionHeading number={2} title="Purpose of the Study Materials" />
                    <Para>Study materials available through Dak Guru are intended exclusively as supplementary self-learning and examination-preparation resources for authorised users.</Para>
                    <Para>They are not:</Para>
                    <ul className="space-y-1.5 mb-3 pl-1">
                        <BulletItem>official Government publications;</BulletItem>
                        <BulletItem>departmental manuals or standing instructions;</BulletItem>
                        <BulletItem>authenticated reproductions of official publications;</BulletItem>
                        <BulletItem>authoritative interpretations of Acts, Rules or orders;</BulletItem>
                        <BulletItem>legal, financial, accounting or administrative advice;</BulletItem>
                        <BulletItem>operational instructions for deciding an official case;</BulletItem>
                        <BulletItem>substitutes for the latest official publications; or</BulletItem>
                        <BulletItem>assurances of success, promotion, selection, appointment or any particular examination result.</BulletItem>
                    </ul>
                    <Para>The materials must not be relied upon as the sole authority for performing official duties, deciding service matters, determining financial entitlement, taking disciplinary action or interpreting statutory obligations.</Para>

                    {/* Section 3 */}
                    <SectionHeading number={3} title="Official Sources Shall Prevail" />
                    <Para>Users must refer to the latest authenticated version of the applicable:</Para>
                    <ul className="space-y-1.5 mb-3 pl-1">
                        <BulletItem>Acts and statutory rules;</BulletItem>
                        <BulletItem>Gazette notifications;</BulletItem>
                        <BulletItem>Government Office Memoranda;</BulletItem>
                        <BulletItem>departmental orders and circulars;</BulletItem>
                        <BulletItem>manuals and handbooks;</BulletItem>
                        <BulletItem>Standard Operating Procedures;</BulletItem>
                        <BulletItem>clarifications issued by competent authorities; and</BulletItem>
                        <BulletItem>amendments, corrigenda and subsequent instructions.</BulletItem>
                    </ul>
                    <Para>If any statement in a Dak Guru study material differs from, omits, simplifies or conflicts with an official source, the latest official source issued by the competent authority shall prevail.</Para>
                    <Para>An explanation, summary, answer or interpretation provided by Dak Guru does not bind the Department of Posts, Government of India, an examining authority or any other competent authority.</Para>

                    {/* Section 4 */}
                    <SectionHeading number={4} title="Source Acknowledgment" />
                    <Para>Dak Guru study materials may be prepared through independent study, research, analysis and verification of publicly available and lawfully accessible sources relevant to the prescribed examination syllabus.</Para>
                    <Para>Such sources may include:</Para>
                    <ul className="space-y-1.5 mb-3 pl-1">
                        <BulletItem>Acts of Parliament;</BulletItem>
                        <BulletItem>statutory Rules and Regulations;</BulletItem>
                        <BulletItem>Gazette notifications;</BulletItem>
                        <BulletItem>Government Office Memoranda;</BulletItem>
                        <BulletItem>departmental manuals and handbooks;</BulletItem>
                        <BulletItem>circulars, orders and clarifications;</BulletItem>
                        <BulletItem>Standard Operating Procedures;</BulletItem>
                        <BulletItem>examination notifications and syllabi;</BulletItem>
                        <BulletItem>publicly available Government information;</BulletItem>
                        <BulletItem>the Postal Financial Handbook;</BulletItem>
                        <BulletItem>Post Office Guides and Postal Manuals; and</BulletItem>
                        <BulletItem>other official or authoritative reference materials.</BulletItem>
                    </ul>
                    <Para>Reference to, citation of or consultation of any source does not transfer ownership of that source to Dak Guru.</Para>
                    <Para>Copyright, trademarks and other proprietary rights in Government publications and third-party materials remain vested in their respective owners. Dak Guru claims no ownership over the underlying official text or any third-party material merely because it has been referred to, cited, explained or discussed.</Para>
                    <Para>Acknowledgment of a source does not by itself constitute permission to reproduce protected material. Nothing in this notice should be interpreted as asserting that attribution alone makes reproduction lawful.</Para>
                    <Para>Where Dak Guru refers to the text of an Act, Rule, Regulation or other statutory provision, it does so in a manner consistent with section 52(1)(q) of the Copyright Act, 1957. Under that provision, the reproduction or publication of an Act of a Legislature does not infringe copyright only where the Act is reproduced or published together with commentary or other original matter. Accordingly, Dak Guru does not publish bare or standalone reproductions of official text as a substitute for the official publication; statutory matter referred to in its materials is presented alongside Dak Guru&apos;s own original explanation, analysis, examination-oriented commentary, selection or arrangement.</Para>

                    {/* Section 5 */}
                    <SectionHeading number={5} title="Dak Guru's Original Content" />
                    <HighlightBox>
                        <p className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 text-center mb-0">© 2026 DG InfoTech (Dak Guru). All rights reserved.</p>
                    </HighlightBox>
                    <Para>Subject to rights subsisting in official and third-party source materials, Dak Guru reserves its rights in the original intellectual and creative components independently developed for its educational resources, including, where applicable:</Para>
                    <ul className="space-y-1.5 mb-3 pl-1">
                        <BulletItem>original explanations and simplified presentations;</BulletItem>
                        <BulletItem>examination-oriented selection and arrangement of topics;</BulletItem>
                        <BulletItem>analytical summaries and comparative discussions;</BulletItem>
                        <BulletItem>original tables, charts, diagrams and illustrations;</BulletItem>
                        <BulletItem>examination tips and revision points;</BulletItem>
                        <BulletItem>memory aids, mnemonics and learning techniques;</BulletItem>
                        <BulletItem>original examples and case-based explanations;</BulletItem>
                        <BulletItem>multiple-choice questions and answer options;</BulletItem>
                        <BulletItem>answer keys and detailed explanations;</BulletItem>
                        <BulletItem>mock tests and assessment structures;</BulletItem>
                        <BulletItem>topic classifications and revision frameworks;</BulletItem>
                        <BulletItem>editorial annotations and commentary;</BulletItem>
                        <BulletItem>compilations involving original selection or arrangement;</BulletItem>
                        <BulletItem>page design, visual presentation and formatting;</BulletItem>
                        <BulletItem>software-generated learning features; and</BulletItem>
                        <BulletItem>other original content created for Dak Guru.</BulletItem>
                    </ul>
                    <Para>Dak Guru does not claim exclusive ownership over:</Para>
                    <ul className="space-y-1.5 mb-3 pl-1">
                        <BulletItem>facts and ideas;</BulletItem>
                        <BulletItem>statutory provisions;</BulletItem>
                        <BulletItem>official terminology;</BulletItem>
                        <BulletItem>prescribed forms and expressions;</BulletItem>
                        <BulletItem>rule numbers;</BulletItem>
                        <BulletItem>monetary limits and official rates;</BulletItem>
                        <BulletItem>Government orders;</BulletItem>
                        <BulletItem>Gazette notifications;</BulletItem>
                        <BulletItem>judicial decisions; or</BulletItem>
                        <BulletItem>materials belonging to the Government or another rights holder.</BulletItem>
                    </ul>
                    <Para>Similarity that necessarily arises from accurately identifying an official provision, prescribed terminology, examination syllabus item or statutory requirement must not be interpreted as a claim by Dak Guru over the underlying official information.</Para>

                    {/* Section 6 */}
                    <SectionHeading number={6} title="Independent Creation and Non-Derivation" />
                    <Para>Dak Guru&apos;s original content is independently developed by referring directly to primary and official source materials and by applying Dak Guru&apos;s own study, analysis, drafting, selection and arrangement.</Para>
                    <Para>It is the policy of Dak Guru that its original content is not copied, scanned, reproduced or substantially adapted from any third-party guide, commercial publication, private coaching material or competing question bank. Where any earlier material is identified as having been derived, whether wholly or in part, from a third-party work, Dak Guru&apos;s practice is to withdraw or independently rebuild that material from primary sources so that the published version constitutes original work.</Para>
                    <Para>This clause records Dak Guru&apos;s good-faith editorial standard. It is not a representation that no resemblance can ever arise between independently prepared educational material and other works addressing the same statutory provisions, syllabus or subject matter, since such resemblance may be unavoidable when accurately stating the same underlying law or facts.</Para>

                    {/* Section 7 */}
                    <SectionHeading number={7} title="Statutory Basis and Fair-Dealing Position" />
                    <Para>Dak Guru&apos;s use of source material is intended to fall within the permitted acts recognised under the Copyright Act, 1957, including fair dealing for the purposes of private study, research, criticism and review, and the specific permissions relating to official and statutory material.</Para>
                    <Para>In particular, and consistent with the position under section 52(1)(q) of that Act:</Para>
                    <ul className="space-y-1.5 mb-3 pl-1">
                        <BulletItem>bare statutory text, rule numbers, official rates, monetary limits, prescribed forms and similar official information are not claimed by Dak Guru and are reproduced, where reproduced at all, only together with Dak Guru&apos;s original commentary or other original matter;</BulletItem>
                        <BulletItem>Dak Guru does not purport to issue, replace or authenticate any official publication, and its materials are not a substitute for the official text published by the competent authority; and</BulletItem>
                        <BulletItem>the explanatory matter, structure, examples, questions, answer keys and presentation added by Dak Guru constitute the original component in which Dak Guru asserts its own rights.</BulletItem>
                    </ul>
                    <Para>This statement reflects Dak Guru&apos;s understanding of the applicable law and does not constitute legal advice. The application of fair dealing and of section 52 to any particular material ultimately depends on the facts and on the determination of a competent court or authority.</Para>

                    {/* Section 8 */}
                    <SectionHeading number={8} title="Limited Personal Licence" />
                    <Para>Subject to the user&apos;s valid membership, purchase or other authorised access, Dak Guru grants the user a limited, personal, revocable, non-exclusive, non-sublicensable and non-transferable permission to access and use the downloaded study materials for individual learning and examination preparation.</Para>
                    <Para>The user does not acquire ownership or copyright in the materials.</Para>
                    <Para>Unless expressly permitted in writing by Dak Guru or allowed under applicable law, the user must not:</Para>
                    <ul className="space-y-1.5 mb-3 pl-1">
                        <BulletItem>share the downloaded material with another person;</BulletItem>
                        <BulletItem>circulate it through WhatsApp, Telegram, email or social media;</BulletItem>
                        <BulletItem>upload it to websites, cloud drives or file-sharing services;</BulletItem>
                        <BulletItem>sell, resell, rent, sublicense or commercially exploit it;</BulletItem>
                        <BulletItem>reproduce or distribute printed or electronic copies;</BulletItem>
                        <BulletItem>use one membership or account for multiple persons;</BulletItem>
                        <BulletItem>publish screenshots, photographs or screen recordings;</BulletItem>
                        <BulletItem>translate, adapt or create derivative commercial materials;</BulletItem>
                        <BulletItem>incorporate it into another book, course, application or question bank;</BulletItem>
                        <BulletItem>remove or alter copyright notices, watermarks or user-identification marks;</BulletItem>
                        <BulletItem>systematically copy questions, explanations or tables;</BulletItem>
                        <BulletItem>scrape, crawl, index or extract the content through automated tools;</BulletItem>
                        <BulletItem>upload substantial portions into artificial-intelligence systems, databases or content-generation tools for reproduction, redistribution or commercial training;</BulletItem>
                        <BulletItem>circumvent access controls, download restrictions or security measures; or</BulletItem>
                        <BulletItem>represent Dak Guru material as the user&apos;s own work.</BulletItem>
                    </ul>
                    <Para>Reasonable printing or offline storage for the authorised user&apos;s personal study may be permitted where the relevant download facility expressly allows it.</Para>
                    <Para>Nothing in this section restricts any use that cannot lawfully be prohibited under applicable law.</Para>

                    {/* Section 9 */}
                    <SectionHeading number={9} title="User-Specific Copies and Anti-Piracy Measures" />
                    <Para>Downloaded materials may contain visible or invisible identifiers, including the authorised user&apos;s name, membership details, transaction information, watermark, document identifier or other anti-piracy markers.</Para>
                    <Para>Such identifiers may be used to:</Para>
                    <ul className="space-y-1.5 mb-3 pl-1">
                        <BulletItem>establish the authorised source of a copy;</BulletItem>
                        <BulletItem>identify unauthorised circulation;</BulletItem>
                        <BulletItem>protect Dak Guru&apos;s intellectual property;</BulletItem>
                        <BulletItem>investigate misuse of the platform; and</BulletItem>
                        <BulletItem>enforce applicable contractual or legal rights.</BulletItem>
                    </ul>
                    <Para>Users must not remove, conceal, crop, modify or interfere with any watermark, notice, identifier or security feature.</Para>
                    <Para>Use of personal information for these purposes shall remain subject to Dak Guru&apos;s applicable Privacy Policy and the law in force.</Para>

                    {/* Section 10 */}
                    <SectionHeading number={10} title="Accuracy and Editorial Review" />
                    <Para>Dak Guru makes reasonable academic and editorial efforts to verify its materials against the sources available on the date of preparation or revision.</Para>
                    <Para>However, no representation is made that every material will always be:</Para>
                    <ul className="space-y-1.5 mb-3 pl-1">
                        <BulletItem>completely error-free;</BulletItem>
                        <BulletItem>exhaustive;</BulletItem>
                        <BulletItem>continuously updated;</BulletItem>
                        <BulletItem>suitable for every individual purpose;</BulletItem>
                        <BulletItem>identical to the interpretation adopted by an examining authority; or</BulletItem>
                        <BulletItem>free from typographical, editorial, technical or interpretative differences.</BulletItem>
                    </ul>
                    <Para>Study materials may simplify complex provisions for easier learning. Such simplification should not be treated as a replacement for the full official provision.</Para>
                    <Para>Users are encouraged to report suspected errors, omissions or outdated provisions so that they may be reviewed.</Para>

                    {/* Section 11 */}
                    <SectionHeading number={11} title="Amendments and Currency of Information" />
                    <Para>Acts, Rules, rates, monetary ceilings, allowances, forms, procedures, designations, software processes and departmental instructions may be amended, clarified, superseded or withdrawn at any time.</Para>
                    <Para>A date of compilation, revision date, update notice or currency indicator represents only the status known to Dak Guru on that date. It does not guarantee that no subsequent amendment has been issued.</Para>
                    <Para>Where a Currency Flag, update symbol or similar warning is displayed, it indicates that the concerned provision may be especially sensitive to amendment. The absence of such a warning must not be treated as confirmation that the information remains current.</Para>
                    <Para>Users must independently verify amendment-sensitive information from the latest official source.</Para>

                    {/* Section 12 */}
                    <SectionHeading number={12} title="Examination Disclaimer" />
                    <Para>Dak Guru independently determines the selection, classification, presentation and emphasis of examination topics.</Para>
                    <Para>Dak Guru does not guarantee:</Para>
                    <ul className="space-y-1.5 mb-3 pl-1">
                        <BulletItem>inclusion of any particular question in an examination;</BulletItem>
                        <BulletItem>exclusion of topics not covered in its materials;</BulletItem>
                        <BulletItem>repetition of questions from a mock test;</BulletItem>
                        <BulletItem>any particular examination pattern or difficulty level;</BulletItem>
                        <BulletItem>acceptance of a particular interpretation by an examiner;</BulletItem>
                        <BulletItem>minimum marks, rank or qualification;</BulletItem>
                        <BulletItem>promotion, recruitment or appointment; or</BulletItem>
                        <BulletItem>any particular academic or career outcome.</BulletItem>
                    </ul>
                    <Para>A user&apos;s result depends upon multiple factors, including individual preparation, understanding, revision, time management, examination conditions and the standards adopted by the examining authority.</Para>
                    <Para>Testimonials, rankings, success stories or previous results must not be interpreted as guarantees of future performance.</Para>

                    {/* Section 13 */}
                    <SectionHeading number={13} title="No Professional or Operational Advice" />
                    <Para>Dak Guru materials are provided for educational purposes.</Para>
                    <Para>They do not constitute legal, accounting, financial, disciplinary, administrative, service-law or professional advice. Users dealing with an actual official matter must consult the applicable official source and, where necessary, obtain guidance from the competent authority or a suitably qualified professional.</Para>
                    <Para>Dak Guru shall not be treated as having assumed responsibility for any official decision merely because a user referred to its educational content.</Para>

                    {/* Section 14 */}
                    <SectionHeading number={14} title="Availability and Technical Limitations" />
                    <Para>Dak Guru may, without prior notice where reasonably necessary:</Para>
                    <ul className="space-y-1.5 mb-3 pl-1">
                        <BulletItem>correct or revise study materials;</BulletItem>
                        <BulletItem>replace an outdated edition;</BulletItem>
                        <BulletItem>withdraw erroneous or superseded content;</BulletItem>
                        <BulletItem>modify download facilities;</BulletItem>
                        <BulletItem>restrict unauthorised access;</BulletItem>
                        <BulletItem>suspend accounts involved in misuse;</BulletItem>
                        <BulletItem>change platform features; or</BulletItem>
                        <BulletItem>discontinue particular content or services.</BulletItem>
                    </ul>
                    <Para>Dak Guru does not guarantee uninterrupted availability of every file, page, feature or download. Temporary interruptions may arise from maintenance, technical failure, security measures, network issues or circumstances beyond reasonable control.</Para>
                    <Para>Users should retain only legitimately downloaded copies and regularly check whether a revised edition has been issued.</Para>

                    {/* Section 15 */}
                    <SectionHeading number={15} title="Third-Party Links and External Resources" />
                    <Para>Dak Guru may provide citations, references or links to Government websites and other external resources for convenience and verification.</Para>
                    <Para>Unless expressly stated otherwise, Dak Guru does not control, maintain or endorse third-party websites and is not responsible for their:</Para>
                    <ul className="space-y-1.5 mb-3 pl-1">
                        <BulletItem>continued availability;</BulletItem>
                        <BulletItem>accuracy or completeness;</BulletItem>
                        <BulletItem>security practices;</BulletItem>
                        <BulletItem>privacy policies;</BulletItem>
                        <BulletItem>subsequent modifications; or</BulletItem>
                        <BulletItem>external content.</BulletItem>
                    </ul>
                    <Para>The presence of a citation or link does not establish sponsorship, approval or endorsement by the linked organisation.</Para>

                    {/* Section 16 */}
                    <SectionHeading number={16} title="Disclaimer of Warranties" />
                    <Para>To the fullest extent permitted by applicable law, Dak Guru materials and services are provided on an educational and informational basis without any express or implied guarantee concerning:</Para>
                    <ul className="space-y-1.5 mb-3 pl-1">
                        <BulletItem>absolute accuracy;</BulletItem>
                        <BulletItem>completeness;</BulletItem>
                        <BulletItem>uninterrupted availability;</BulletItem>
                        <BulletItem>continuous currency;</BulletItem>
                        <BulletItem>suitability for an official purpose;</BulletItem>
                        <BulletItem>fitness for a particular examination outcome; or</BulletItem>
                        <BulletItem>freedom from every technical or editorial error.</BulletItem>
                    </ul>
                    <Para>Nothing in this notice excludes or restricts any statutory right, warranty, remedy or liability that cannot lawfully be excluded or restricted.</Para>

                    {/* Section 17 */}
                    <SectionHeading number={17} title="Limitation of Liability" />
                    <Para>To the fullest extent permitted by applicable law, Dak Guru and its proprietor, authors, editors, reviewers, contributors, employees and service providers shall not be responsible for indirect, incidental, special or consequential loss arising from:</Para>
                    <ul className="space-y-1.5 mb-3 pl-1">
                        <BulletItem>reliance on study material without verification from official sources;</BulletItem>
                        <BulletItem>an amendment issued after the material was prepared;</BulletItem>
                        <BulletItem>misunderstanding or misapplication of educational content;</BulletItem>
                        <BulletItem>use of the material for an actual official, legal or financial decision;</BulletItem>
                        <BulletItem>examination performance or career-related decisions;</BulletItem>
                        <BulletItem>reliance on an outdated, modified or unauthorised copy;</BulletItem>
                        <BulletItem>temporary platform unavailability; or</BulletItem>
                        <BulletItem>unauthorised use of a user&apos;s account caused by the user&apos;s failure to protect access credentials.</BulletItem>
                    </ul>
                    <Para>This provision does not exclude liability that cannot legally be excluded, including any mandatory liability arising under applicable consumer-protection or other laws.</Para>

                    {/* Section 18 */}
                    <SectionHeading number={18} title="Reporting Copyright and Source Concerns" />
                    <Para>Dak Guru respects the intellectual-property rights of Government authorities, authors, publishers and other rights holders.</Para>
                    <Para>A person who genuinely believes that any material available through Dak Guru:</Para>
                    <ul className="space-y-1.5 mb-3 pl-1">
                        <BulletItem>reproduces protected material without lawful authority;</BulletItem>
                        <BulletItem>contains an incorrect ownership acknowledgment;</BulletItem>
                        <BulletItem>improperly uses a logo, image, table or illustration; or</BulletItem>
                        <BulletItem>otherwise infringes a legally enforceable right,</BulletItem>
                    </ul>
                    <Para>may submit a written notice containing:</Para>
                    <ul className="space-y-1.5 mb-3 pl-1">
                        <BulletItem>the claimant&apos;s name and contact details;</BulletItem>
                        <BulletItem>identification of the protected work;</BulletItem>
                        <BulletItem>identification of the Dak Guru material concerned;</BulletItem>
                        <BulletItem>the relevant page, passage, question or file;</BulletItem>
                        <BulletItem>the basis of the claimant&apos;s right;</BulletItem>
                        <BulletItem>supporting documents or an authoritative source; and</BulletItem>
                        <BulletItem>the corrective action requested.</BulletItem>
                    </ul>
                    <HighlightBox>
                        <p className="text-[13px] text-zinc-700 dark:text-zinc-300 text-center mb-1">Notices may be sent to:</p>
                        <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200 text-center">Email: admin@dakguru.com &nbsp;·&nbsp; Website: www.dakguru.com</p>
                    </HighlightBox>
                    <Para>Receipt of a complaint does not by itself establish infringement. Dak Guru may examine the complaint, request further particulars and take appropriate action, including correction, attribution, restriction, replacement or removal where warranted.</Para>
                    <Para>Dak Guru is committed to acting in good faith and expeditiously on any substantiated complaint. On receipt of a complaint containing the particulars listed above, Dak Guru will endeavour to acknowledge it within a reasonable period and, where the complaint is found on examination to be well founded, to remove, restrict, correct or appropriately attribute the material concerned without undue delay. Pending examination of a credible complaint, Dak Guru may, as a precautionary measure and without admission of liability, temporarily restrict access to the material identified.</Para>

                    {/* Section 19 */}
                    <SectionHeading number={19} title="Reporting Academic Errors" />
                    <Para>Users may report suspected factual errors, outdated provisions, incorrect answers or missing amendments through:</Para>
                    <HighlightBox>
                        <p className="text-[13px] text-zinc-700 dark:text-zinc-300 text-center mb-1">Academic Review Email: admin@dakguru.com</p>
                        <p className="text-[13px] text-zinc-700 dark:text-zinc-300 text-center">Support Page: https://www.dakguru.com/social?tab=report</p>
                    </HighlightBox>
                    <Para>Reports should clearly identify the study material, version, page or question number, the alleged error and the supporting official source.</Para>
                    <Para>Dak Guru may review and correct genuine errors through an updated edition, corrigendum or portal notification.</Para>

                    {/* Section 20 */}
                    <SectionHeading number={20} title="Enforcement Against Unauthorised Distribution" />
                    <Para>Dak Guru reserves the right to take appropriate action against unauthorised copying, sharing, resale, account misuse, removal of watermarks or commercial exploitation of its original content.</Para>
                    <Para>Depending upon the circumstances and applicable law, such action may include:</Para>
                    <ul className="space-y-1.5 mb-3 pl-1">
                        <BulletItem>suspension or termination of access;</BulletItem>
                        <BulletItem>cancellation of the limited personal licence;</BulletItem>
                        <BulletItem>preservation of relevant technical and transaction records;</BulletItem>
                        <BulletItem>issue of a takedown or cease-and-desist notice;</BulletItem>
                        <BulletItem>reporting infringing uploads to the concerned platform;</BulletItem>
                        <BulletItem>recovery of remedies available under contract or law; and</BulletItem>
                        <BulletItem>initiation of appropriate legal proceedings.</BulletItem>
                    </ul>
                    <Para>Any enforcement action shall remain subject to applicable law and the facts of the particular case.</Para>

                    {/* Section 21 */}
                    <SectionHeading number={21} title="No Waiver" />
                    <Para>Failure or delay by Dak Guru in enforcing any provision of this notice does not constitute a permanent waiver of that provision or of any right available under law.</Para>
                    <Para>A waiver shall be effective only when expressly communicated by an authorised representative of Dak Guru.</Para>

                    {/* Section 22 */}
                    <SectionHeading number={22} title="Severability" />
                    <Para>If any provision of this notice is held to be invalid, unlawful or unenforceable by a competent authority, that provision shall be interpreted or limited to the minimum extent necessary, and the remaining provisions shall continue to apply to the extent permitted by law.</Para>

                    {/* Section 23 */}
                    <SectionHeading number={23} title="Changes to This Notice" />
                    <Para>Dak Guru may revise this notice to reflect changes in:</Para>
                    <ul className="space-y-1.5 mb-3 pl-1">
                        <BulletItem>applicable law;</BulletItem>
                        <BulletItem>platform features;</BulletItem>
                        <BulletItem>membership conditions;</BulletItem>
                        <BulletItem>download practices;</BulletItem>
                        <BulletItem>source-management procedures; or</BulletItem>
                        <BulletItem>intellectual-property safeguards.</BulletItem>
                    </ul>
                    <Para>The revised version shall take effect from the effective date displayed on this webpage. Continued access or use after the revised notice becomes effective shall be subject to the updated version, to the extent permitted by law.</Para>

                    {/* Section 24 */}
                    <SectionHeading number={24} title="Governing Law and Jurisdiction" />
                    <Para>This notice and the use of Dak Guru study materials shall be governed by the laws in force in India.</Para>
                    <Para>Subject to any mandatory statutory forum or jurisdiction available to a consumer or other person under applicable law, disputes shall be dealt with by the courts or competent authorities having lawful jurisdiction at Tamil Nadu.</Para>

                    {/* Section 25 */}
                    <SectionHeading number={25} title="Acceptance by the User" />
                    <Para>Before downloading a study material, the user may be required to confirm:</Para>
                    <HighlightBox>
                        <p className="text-[13px] text-zinc-700 dark:text-zinc-300 leading-relaxed text-center italic">
                            &ldquo;I have read and understood the Legal Notice, Copyright, Source Acknowledgment and Disclaimer. I understand that the material is an independent and unofficial examination-preparation resource; that official sources shall prevail; and that my access is limited to personal, non-transferable study use.&rdquo;
                        </p>
                    </HighlightBox>
                    <Para>If the user does not agree to these conditions, the user should not download, copy or use the study material.</Para>

                    {/* Important User Notice */}
                    <div className={`mt-5 sm:mt-8 p-4 sm:p-5 rounded-2xl border-2 ${isPS ? 'bg-teal-50 dark:bg-teal-900/15 border-teal-200 dark:border-teal-800/50' : 'bg-amber-50 dark:bg-amber-900/15 border-amber-200 dark:border-amber-800/50'}`}>
                        <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
                            <AlertTriangle className={`w-4 h-4 sm:w-5 sm:h-5 ${isPS ? 'text-teal-600 dark:text-teal-400' : 'text-amber-600 dark:text-amber-400'}`} />
                            <h3 className={`text-xs sm:text-sm font-black uppercase tracking-wider ${isPS ? 'text-teal-800 dark:text-teal-300' : 'text-amber-800 dark:text-amber-300'}`}>Important User Notice</h3>
                        </div>
                        <p className={`text-[10px] sm:text-xs font-bold text-center mb-1.5 sm:mb-2 ${isPS ? 'text-teal-700 dark:text-teal-300' : 'text-amber-700 dark:text-amber-300'}`}>For examination preparation only</p>
                        <div className="space-y-1.5 sm:space-y-2">
                            <p className="text-[10px] sm:text-[12px] text-zinc-600 dark:text-zinc-400 leading-relaxed text-center">Dak Guru is an independent and unofficial educational platform. It is not affiliated with or endorsed by the Department of Posts or the Government of India.</p>
                            <p className="text-[10px] sm:text-[12px] text-zinc-600 dark:text-zinc-400 leading-relaxed text-center">Study materials are supplementary learning resources and must not be treated as official publications or operational instructions.</p>
                            <p className="text-[10px] sm:text-[12px] text-zinc-600 dark:text-zinc-400 leading-relaxed text-center">Always verify Acts, Rules, amendments, rates, monetary ceilings, procedures and departmental instructions from the latest authenticated official source.</p>
                            <p className={`text-[10px] sm:text-[12px] font-bold text-center ${isPS ? 'text-teal-700 dark:text-teal-300' : 'text-amber-700 dark:text-amber-300'}`}>Official sources shall prevail in every case.</p>
                        </div>
                    </div>

                    {/* Bottom spacing */}
                    <div className="h-2 sm:h-4" />
                </div>

                {/* Footer */}
                <div className="px-4 py-3 sm:p-6 border-t border-zinc-100 dark:border-zinc-800 shrink-0 bg-zinc-50 dark:bg-zinc-900/50" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
                    <button
                        onClick={onClose}
                        className={`w-full py-3 sm:py-4 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg transition-all active:scale-95 ${isPS ? 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-teal-500/20' : 'bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 shadow-purple-500/20'}`}
                    >
                        I Understand &amp; Acknowledge
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LegalNoticeModal;
