import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { business } from "../data/business";
import { useLang } from "../lib/i18n";
import { EMAIL, PHONE, PHONE2, mailLink } from "../lib/utils";

function Shell({ title, children }: { title: string; children: ReactNode }) {
  const { lang } = useLang();
  return (
    <article className="container-x max-w-3xl pb-24 pt-36">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sun-400">Legal</p>
      <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-white/50">Last updated: {business.legalUpdated}</p>
      {lang === "hi" && (
        <p className="mt-6 rounded-2xl border border-sun-400/20 bg-sun-400/5 p-4 text-sm text-white/75">
          यह दस्तावेज़ अंग्रेज़ी में है। किसी भी सवाल के लिए हमें {PHONE} पर कॉल करें या {EMAIL} पर ईमेल करें।
        </p>
      )}
      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-white/70 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-1.5 [&_a]:text-sun-300 [&_a]:underline-offset-4 hover:[&_a]:underline">
        {children}
      </div>
    </article>
  );
}

function Contact() {
  return (
    <section>
      <h2>Contact & grievances</h2>
      <p>
        {business.legalName}, {business.address}
        <br />
        Phone: {PHONE}, {PHONE2} · Email: <a href={mailLink}>{EMAIL}</a>
        {business.gstin && (
          <>
            <br />
            GSTIN: {business.gstin}
          </>
        )}
        {business.udyam && (
          <>
            <br />
            Udyam Registration No.: {business.udyam}
          </>
        )}
      </p>
      <p className="mt-3">Grievance officer: {business.owner}. We aim to respond within 7 working days.</p>
    </section>
  );
}

export function Privacy() {
  return (
    <Shell title="Privacy Policy">
      <section>
        <p>
          This policy explains how {business.legalName} (“we”, “us”) handles information when you use this website. We collect as little personal data as possible, and we do
          not sell it. It is written with the Digital Personal Data Protection Act, 2023 in mind.
        </p>
      </section>
      <section>
        <h2>What we collect</h2>
        <ul>
          <li>
            <strong className="text-white">Enquiries you send us.</strong> The enquiry form and the “Quick enquiry” builder do not store anything on our servers. They open WhatsApp
            with a pre-filled message (for example your name, town and what you need). We receive it only after you press send in WhatsApp.
          </li>
          <li>
            <strong className="text-white">AI assistant chats.</strong> Messages you type to “Mathur Mitra” are sent to our server and to an AI provider (Google Gemini or OpenAI) to
            generate a reply. We don't save these chats in a database. The provider may process them under its own terms. Please don't share sensitive information such as
            Aadhaar, bank or card numbers in the chat.
          </li>
          <li>
            <strong className="text-white">Phone calls, WhatsApp and email.</strong> When you contact us we see your number or email address and use it only to reply and to serve you.
          </li>
          <li>
            <strong className="text-white">Technical data.</strong> Our hosting provider (Vercel) keeps standard server logs, such as IP address, browser type and pages requested,
            for security and reliability.
          </li>
        </ul>
      </section>
      <section>
        <h2>Cookies and local storage</h2>
        <p>
          We use no advertising or analytics cookies. Your browser stores your language choice (English/हिंदी) and the current AI chat session locally on your device. You can
          clear these at any time from your browser settings.
        </p>
      </section>
      <section>
        <h2>Third-party services</h2>
        <ul>
          <li>WhatsApp (Meta) for messages you choose to send us.</li>
          <li>Google Maps, embedded on the contact page, and Google Fonts for typography.</li>
          <li>Google Gemini or OpenAI to power the AI assistant.</li>
          <li>Vercel to host the website.</li>
        </ul>
        <p className="mt-3">These services have their own privacy policies.</p>
      </section>
      <section>
        <h2>How we use your information</h2>
        <ul>
          <li>To answer enquiries and arrange site surveys, test rides, quotations and service.</li>
          <li>To help with government schemes such as PM Surya Ghar, but only with documents you give us for that purpose.</li>
          <li>To meet legal, tax and warranty obligations.</li>
        </ul>
      </section>
      <section>
        <h2>Your rights</h2>
        <p>You may ask us to access, correct or delete the personal data we hold about you, or withdraw consent, by contacting us using the details below.</p>
      </section>
      <section>
        <h2>Children</h2>
        <p>This website is not intended for children under 18. We do not knowingly collect their data.</p>
      </section>
      <Contact />
      <p className="text-sm text-white/45">
        See also our <Link to="/terms">Terms of Service</Link>.
      </p>
    </Shell>
  );
}

export function Terms() {
  return (
    <Shell title="Terms of Service">
      <section>
        <p>
          By using this website you agree to these terms. The website is run by {business.legalName}, Haldwani, Uttarakhand. It gives information about our solar solutions,
          Rajhans e-rickshaw dealership and Okaya distributorship.
        </p>
      </section>
      <section>
        <h2>Information on this website</h2>
        <ul>
          <li>Product details, photos and specifications are for general information and may change without notice.</li>
          <li>We do not publish prices on this website. Prices are given only in a written quotation.</li>
          <li>
            Subsidy figures (including PM Surya Ghar) and savings from the calculator are <strong className="text-white">estimates only</strong>. The final subsidy depends on
            government rules, eligibility, approvals and the DISCOM, and is paid by the government, not by us.
          </li>
        </ul>
      </section>
      <section>
        <h2>AI assistant</h2>
        <p>
          “Mathur Mitra” is an automated assistant and can make mistakes. Its answers are not a quotation, offer or commitment. Please confirm important details with our team
          before you decide.
        </p>
      </section>
      <section>
        <h2>Orders, warranty and service</h2>
        <ul>
          <li>Orders are confirmed only by a written quotation or invoice from us.</li>
          <li>Product warranties are given by the respective manufacturers (for example RAJHANSev and Okaya) under their own terms. We help you with claims.</li>
          <li>Installation timelines depend on site conditions, approvals and stock availability.</li>
        </ul>
      </section>
      <section>
        <h2>Trademarks</h2>
        <p>
          RAJHANSev, OKAYA, LUNO, WAAREE, SOLASTICE, HAVELLS, USHA and other brand names belong to their respective owners. We use them only to show the products we deal in.
          Photos of installations, events and team members belong to {business.legalName}.
        </p>
      </section>
      <section>
        <h2>Acceptable use</h2>
        <p>Do not misuse the website, the enquiry tools or the AI assistant. This includes spam, automated scraping, or attempts to disrupt the service.</p>
      </section>
      <section>
        <h2>Liability</h2>
        <p>To the extent the law allows, we are not liable for indirect losses that arise from using this website or relying on estimates shown on it.</p>
      </section>
      <section>
        <h2>Governing law</h2>
        <p>These terms are governed by the laws of India. Courts at Haldwani, Uttarakhand have jurisdiction.</p>
      </section>
      <Contact />
      <p className="text-sm text-white/45">
        See also our <Link to="/privacy">Privacy Policy</Link>.
      </p>
    </Shell>
  );
}
