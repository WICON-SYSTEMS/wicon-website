import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how WiCon Systems collects, uses, and protects your personal data, and the rights you have under applicable data protection laws.",
  openGraph: {
    title: "WiCon • Privacy Policy",
    description:
      "Learn how WiCon Systems collects, uses, and protects your personal data, and the rights you have under applicable data protection laws.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "WiCon • Privacy Policy",
    description:
      "Learn how WiCon Systems collects, uses, and protects your personal data, and the rights you have under applicable data protection laws.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-black/60">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="mt-10 space-y-8">
            <p className="text-sm leading-7 text-black/80">
              At WiCon Systems ("WiCon", "we", "us", or "our"), we take your
              privacy seriously. This Privacy Policy explains how we collect,
              use, disclose, and protect information about you when you use our
              website, products, and services (collectively, the "Services").
            </p>

            <div>
              <h2 className="text-xl font-semibold">
                1) Information We Collect
              </h2>
              <ul className="mt-3 list-disc list-inside space-y-2 text-sm text-black/80">
                <li>
                  Contact Information: name, email address, phone number,
                  address, organization, and similar details you provide via
                  forms (e.g., Contact, Training, Careers, Volunteer).
                </li>
                <li>
                  Application Materials: information you submit for internships
                  or training (e.g., CV, photo, academic history, experience,
                  references).
                </li>
                <li>
                  Communications: messages sent to us via forms or email and our
                  responses.
                </li>
                <li>
                  Technical Data: Device and browser information, and basic
                  analytics to improve our Services.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                2) How We Use Your Information
              </h2>
              <ul className="mt-3 list-disc list-inside space-y-2 text-sm text-black/80">
                <li>To provide, maintain, and improve our Services.</li>
                <li>
                  To process and respond to your requests (e.g., training
                  registration, volunteer interest, internship applications,
                  partnership interests, contact inquiries).
                </li>
                <li>
                  To communicate with you (e.g., confirmations, updates,
                  administrative messages).
                </li>
                <li>
                  For security, fraud prevention, and to comply with legal
                  obligations.
                </li>
                <li>
                  With your consent, to send newsletters or marketing
                  communications you opt in to.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                3) Legal Bases for Processing
              </h2>
              <p className="mt-3 text-sm text-black/80">
                Where applicable (e.g., under GDPR), we rely on one or more of
                the following legal bases: consent, performance of a contract,
                legitimate interests (such as improving our Services and
                ensuring security), and compliance with legal obligations.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                4) Sharing of Information
              </h2>
              <p className="mt-3 text-sm text-black/80">
                We do not sell personal information. We may share information
                with trusted service providers (e.g., hosting, email delivery,
                analytics) who process data on our behalf under appropriate data
                protection terms. We may also disclose information if required
                by law or to protect rights and safety.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">5) Data Retention</h2>
              <p className="mt-3 text-sm text-black/80">
                We retain personal data only for as long as necessary to fulfill
                the purposes outlined in this Policy, including legal,
                accounting, or reporting requirements. Retention periods may
                vary based on the type of data and context of collection.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">6) Security</h2>
              <p className="mt-3 text-sm text-black/80">
                We implement reasonable technical and organizational measures to
                protect personal data. However, no method of transmission or
                storage is fully secure, and we cannot guarantee absolute
                security.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                7) International Transfers
              </h2>
              <p className="mt-3 text-sm text-black/80">
                Your information may be processed in countries other than your
                own. Where required, we take steps to ensure appropriate
                safeguards for cross-border transfers.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">8) Your Rights</h2>
              <p className="mt-3 text-sm text-black/80">
                Depending on your location, you may have rights such as access,
                correction, deletion, restriction, objection, and data
                portability. You can exercise these rights by contacting us
                using the details below. We may need to verify your identity.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                9) Cookies and Similar Technologies
              </h2>
              <p className="mt-3 text-sm text-black/80">
                We may use cookies and similar technologies to operate and
                improve the site. You can manage preferences in your browser
                settings.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                10) Changes to This Policy
              </h2>
              <p className="mt-3 text-sm text-black/80">
                We may update this Policy from time to time to reflect changes
                to our practices or legal requirements. We will post the updated
                version on this page with a revised “Last updated” date.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">11) Contact Us</h2>
              <p className="mt-3 text-sm text-black/80">
                If you have questions about this Privacy Policy or our data
                practices, contact us at:
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-sm text-black/80">
                <li>Email: info@wiconltd.com</li>
                <li>Address: WiCon Systems, SW Buea, Cameroon</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
