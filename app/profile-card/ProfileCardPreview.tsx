"use client";

import { useRef } from "react";
import type { ProfileData } from "./page";

interface Props {
  data: ProfileData;
}

const NAVY = "#16224d";
const NAVY_TEXT = "#1a2b5e";
const GOLD = "#c4a02f";

export default function ProfileCardPreview({ data }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    const html2canvas = (await import("html2canvas-pro")).default;
    const { jsPDF } = await import("jspdf");

    const canvas = await html2canvas(cardRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = canvas.width / 3;
    const pdfHeight = canvas.height / 3;
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [pdfWidth, pdfHeight],
    });

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${data.name || "profile"}-card.pdf`);
  };

  const contacts = [
    { icon: "/images/details/phone.jpeg", text: data.phone || "+91-9830418293" },
    { icon: "/images/details/email.png", text: data.email || "Arindam.s@vcomtechnologies.in" },
    { icon: "/images/details/website.png", text: data.website || "www.vcomtechnologies.in" },
  ];

  const pillars = [
    { icon: "/images/tagline/technology.png", label: "TECHNOLOGY" },
    { icon: "/images/tagline/trust.png", label: "TRUST" },
    { icon: "/images/tagline/transportation.png", label: "TRANSFORMATION" },
  ];

  // Social icons — gold ring + white glyph to match the navy/gold theme
  const socials = [
    {
      id: "linkedin",
      glyph: (
        <path
          fill="#ffffff"
          d="M8.34 9.6H6.2V16h2.14V9.6zM7.27 8.66a1.24 1.24 0 110-2.48 1.24 1.24 0 010 2.48zM17.8 16h-2.13v-3.35c0-.8-.015-1.83-1.115-1.83-1.116 0-1.287.872-1.287 1.772V16h-2.132V9.6h2.046v.875h.03c.285-.54.98-1.11 2.018-1.11 2.16 0 2.56 1.42 2.56 3.27V16z"
        />
      ),
    },
    {
      id: "twitter",
      glyph: (
        <path
          d="M8.2 7.6l7.6 8.8M15.8 7.6l-7.6 8.8"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ),
    },
    {
      id: "facebook",
      glyph: (
        <path
          fill="#ffffff"
          d="M13.1 17.5v-4.6h1.55l.23-1.8h-1.78v-1.15c0-.52.145-.875.89-.875h.95V7.36a12.6 12.6 0 00-1.385-.07c-1.37 0-2.31.836-2.31 2.372v1.04H9.7v1.8h1.54v4.6h1.86z"
        />
      ),
    },
    {
      id: "instagram",
      glyph: (
        <>
          <rect
            x="7.5"
            y="7.5"
            width="9"
            height="9"
            rx="2.6"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.3"
          />
          <circle cx="12" cy="12" r="2.4" fill="none" stroke="#ffffff" strokeWidth="1.3" />
          <circle cx="15" cy="9" r="0.75" fill="#ffffff" />
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center gap-8">
      {/* ══════ CARD ══════ */}
      <div
        ref={cardRef}
        className="w-full max-w-[820px] overflow-hidden bg-white shadow-lg"
        style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
      >
        {/* ── Main content area ── */}
        <div className="flex px-2 pt-8 pb-2">
          {/* ▌LEFT COLUMN ▌ */}
          <div className="flex w-[300px] shrink-0 flex-col items-center px-6">
            {/* Profile photo — circular with gold ring */}
            <div className="rounded-full border-[2px] border-[#c4a02f] p-[4px]">
              <div className="h-[150px] w-[150px] overflow-hidden rounded-full">
                {data.profileImage ? (
                  <img
                    src={data.profileImage}
                    alt={data.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#eef2f7] text-4xl font-bold text-[#1a2b5e]/30">
                    {data.name ? data.name.charAt(0).toUpperCase() : "?"}
                  </div>
                )}
              </div>
            </div>
            {/* Diamond separator */}
              <div className="mt-3 flex items-center gap-[6px]">
                <div className="h-px w-[70px] bg-[#c4a02f]"></div>
                <div className="h-[6px] w-[6px] rotate-45 bg-[#c4a02f]"></div>
                <div className="h-px w-[70px] bg-[#c4a02f]"></div>
              </div>

            {/* Company Logo */}
            <div className="mt-7 flex flex-col items-center">
              <img
                src="/logo.png"
                alt="VCOM Technologies"
                className="h-[78px] w-auto object-contain"
              />
              {/* Diamond separator */}
              <div className="mt-3 flex items-center gap-[6px]">
                <div className="h-px w-[70px] bg-[#c4a02f]"></div>
                <div className="h-[6px] w-[6px] rotate-45 bg-[#c4a02f]"></div>
                <div className="h-px w-[70px] bg-[#c4a02f]"></div>
              </div>
              {/* Tagline */}
              <p className="mt-[10px] text-[9px] font-semibold tracking-[0.18em] text-[#4a4a4a]">
                INSPIRE. INNOVATE. INTEGRATE.
              </p>
            </div>
          </div>

          {/* ▌VERTICAL DIVIDER (with center diamond) ▌ */}
          <div className="relative mx-2 flex w-px shrink-0 justify-center self-stretch bg-[#c4a02f]">
            <div className="absolute top-1/2 h-[8px] w-[8px] -translate-y-1/2 rotate-45 bg-[#c4a02f]"></div>
          </div>

          {/* ▌RIGHT COLUMN ▌ */}
          <div className="flex flex-1 flex-col pl-8 pr-8">
            {/* Name & Designation */}
            <div>
              <h2
                className="text-[32px] font-bold uppercase leading-[1.05] tracking-[0.01em] text-[#1a2b5e]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {data.name || "ARINDAM SENGUPTA"}
              </h2>
              <p className="mt-[6px] text-[20px] font-normal text-[#c4a02f]">
                {data.designation || "Regional Manager"}
              </p>
              {/* gold underline */}
              <div className="mt-[10px] h-[2px] w-[58px] bg-[#c4a02f]"></div>
            </div>

            {/* Contact info with image icons */}
            <div className="mt-5">
              {contacts.map((c, i) => (
                <div
                  key={c.icon}
                  className="flex items-center gap-[14px] border-b border-[#e8e8e8] py-[11px] last:border-b-0"
                >
                  <img
                    src={c.icon}
                    alt=""
                    className="h-[34px] w-[34px] shrink-0 rounded-full object-contain"
                  />
                  <div className="h-[24px] w-px bg-[#c4a02f]"></div>
                  <span className="text-[15px] text-[#2c2c2c]">{c.text}</span>
                </div>
              ))}
            </div>

            {/* Divider with center diamond above pillars */}
            <div className="mt-5 flex items-center">
              <div className="h-px flex-1" style={{ backgroundColor: "#e0d3a8" }}></div>
              <div className="mx-[8px] h-[7px] w-[7px] rotate-45 bg-[#c4a02f]"></div>
              <div className="h-px flex-1" style={{ backgroundColor: "#e0d3a8" }}></div>
            </div>

            {/* Pillars — TECHNOLOGY ◆ TRUST ◆ TRANSFORMATION */}
            <div className="mt-4 flex items-center justify-between px-1">
              {pillars.flatMap((p, i) => {
                const item = (
                  <div key={p.label} className="flex items-center gap-[8px]">
                    <img
                      src={p.icon}
                      alt=""
                      className="h-[22px] w-[22px] object-contain"
                    />
                    <span className="text-[10px] font-bold tracking-[0.06em] text-[#1a2b5e]">
                      {p.label}
                    </span>
                  </div>
                );
                if (i === 0) return [item];
                return [
                  <div
                    key={`${p.label}-sep`}
                    className="h-[7px] w-[7px] rotate-45 bg-[#c4a02f]"
                  ></div>,
                  item,
                ];
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom bar — notched navy footer with gold trim ── */}
        <div className="relative mt-5">
          <svg
            className="block w-full"
            viewBox="0 0 820 60"
            preserveAspectRatio="none"
            style={{ height: "60px" }}
          >
            <path
              d="M0,20 L305,20 L340,6 L480,6 L515,20 L820,20 L820,60 L0,60 Z"
              fill={NAVY}
            />
            <path
              d="M0,20 L305,20 L340,6 L480,6 L515,20 L820,20"
              fill="none"
              stroke={GOLD}
              strokeWidth="2.5"
            />
          </svg>

          {/* Footer content — address (left) + social icons (right) */}
          <div className="absolute inset-x-0 bottom-0 flex h-[40px] items-center justify-between px-8">
            <div className="flex min-w-0 items-center gap-2">
              {data.officeAddress && (
                <>
                  <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 " fill="none">
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      fill="#ffffff"
                    />
                    <circle cx="12" cy="9" r="2.5" fill={NAVY} />
                  </svg>
                  <p className="max-w-[440px] truncate text-[10px] text-white/90">
                    {data.officeAddress}
                  </p>
                </>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-[10px]">
              {socials.map((s) => (
                <svg key={s.id} viewBox="0 0 24 24" className="h-[24px] w-[24px]">
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    fill="none"
                    stroke={GOLD}
                    strokeWidth="1.4"
                  />
                  {s.glyph}
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="rounded-lg bg-[#1a2b5e] px-10 py-3 text-sm font-bold tracking-wide text-white shadow-lg transition hover:bg-[#0f1a3d] active:scale-95"
      >
        ⬇ Download as PDF
      </button>
    </div>
  );
}
