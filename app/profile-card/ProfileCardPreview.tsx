"use client";

import { useRef } from "react";
import type { ProfileData } from "./page";
import { officeAddresses } from "./officeAddresses";

interface Props {
  data: ProfileData;
}

const NAVY = "#16224d";
const NAVY_TEXT = "#1a2b5e";
const GOLD = "#c4a02f";

export default function ProfileCardPreview({ data }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
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

  const handleDownloadJPG = async () => {
    if (!cardRef.current) return;

    const html2canvas = (await import("html2canvas-pro")).default;

    const canvas = await html2canvas(cardRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const link = document.createElement("a");
    link.download = `${data.name || "profile"}-card.jpg`;
    link.href = canvas.toDataURL("image/jpeg", 0.95);
    link.click();
  };

  const contacts = [
    {
      icon: "/images/details/phone.jpeg",
      text: data.phone ? `+91-${data.phone}` : "",
    },
    {
      icon: "/images/details/email.png",
      text: data.email || "",
    },
    {
      icon: "/images/details/website.png",
      text: "www.vcomtechnologies.in",
    },
  ];

  const pillars = [
    { icon: "/images/tagline/technology.png", label: "TECHNOLOGY" },
    { icon: "/images/tagline/trust.png", label: "TRUST" },
    { icon: "/images/tagline/transportation.png", label: "TRANSFORMATION" },
  ];

  // Social icons — navy filled circle + white glyph (same style as contact icons)
  const socials = [
    {
      id: "linkedin",
      glyph: (
        <path
          fill="#ffffff"
          d="M8.5 10.2h1.8V16H8.5v-5.8zm.9-3a1.05 1.05 0 110 2.1 1.05 1.05 0 010-2.1zM11.5 10.2h1.7v.8h.02c.24-.45.83-.92 1.7-.92 1.82 0 2.16 1.2 2.16 2.76V16h-1.8v-2.76c0-.66-.01-1.5-.92-1.5s-1.06.72-1.06 1.46V16h-1.8v-5.8z"
        />
      ),
    },
    {
      id: "twitter",
      glyph: (
        <path
          d="M8.8 8l3.2 4.3L8.8 16h.7l2.8-3.2L14.8 16h2.4l-3.4-4.5L16.8 8h-.7l-2.6 2.9L11.2 8H8.8zm1.1.7h1.2l4.8 6.6h-1.2L9.9 8.7z"
          fill="#ffffff"
        />
      ),
    },
    {
      id: "facebook",
      glyph: (
        <path
          fill="#ffffff"
          d="M13.4 16v-4h1.3l.2-1.5h-1.5v-1c0-.4.1-.7.7-.7h.8V7.4c-.1 0-.6-.1-1.1-.1-1.1 0-1.9.7-1.9 2v1.1h-1.3V12h1.3v4h1.5z"
        />
      ),
    },
    {
      id: "instagram",
      glyph: (
        <>
          <rect
            x="7.8"
            y="7.8"
            width="8.4"
            height="8.4"
            rx="2.2"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
          />
          <circle
            cx="12"
            cy="12"
            r="2.1"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
          />
          <circle cx="14.8" cy="9.2" r="0.6" fill="#ffffff" />
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
              <p className="mt-[10px] text-[9px] font-semibold tracking-[0.18em] text-[#4a4a4a] py-1">
                INSPIRE. INNOVATE. INTEGRATE.
              </p>

              {/* Diamond separator */}
              <div className="mt-3 flex items-center gap-[6px]">
                <div className="h-px w-[70px] bg-[#c4a02f]"></div>
                <div className="h-[6px] w-[6px] rotate-45 bg-[#c4a02f]"></div>
                <div className="h-px w-[70px] bg-[#c4a02f]"></div>
              </div>
              {/* Social media icons */}
              <div className="mt-3 flex items-center gap-[8px]">
                {socials.map((s) => (
                  <svg
                    key={s.id}
                    viewBox="0 0 24 24"
                    className="h-[34px] w-[34px]"
                  >
                    <circle cx="12" cy="12" r="12" fill={NAVY} />
                    {s.glyph}
                  </svg>
                ))}
              </div>
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
              {/* Address row */}
              <div className="flex items-center gap-[14px] py-[11px]">
                <img
                  src="/images/details/address.png"
                  alt=""
                  className="h-[34px] w-[34px] shrink-0 rounded-full object-contain"
                />
                <div className="h-[24px] w-px bg-[#c4a02f]"></div>
                <span className="text-[13px] leading-tight text-[#2c2c2c]">
                  {data.officeAddress || "Office Address"}
                </span>
              </div>
            </div>

            {/* Divider with center diamond above pillars */}
            <div className="mt-5 flex items-center">
              <div
                className="h-px flex-1"
                style={{ backgroundColor: "#e0d3a8" }}
              ></div>
              <div className="mx-[8px] h-[7px] w-[7px] rotate-45 bg-[#c4a02f]"></div>
              <div
                className="h-px flex-1"
                style={{ backgroundColor: "#e0d3a8" }}
              ></div>
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

          {/* Footer content — city names */}
          <div className="absolute inset-x-0 bottom-0 flex h-[40px] items-center justify-center px-8">
            <p className="truncate text-[9px] font-medium text-white">
              {officeAddresses
                .filter((loc) => !["Mumbai (Vile Parle)", "Gurgaon", "Greater Noida"].includes(loc.city))
                .map((loc, i) => {
                  const displayName = loc.city === "Mumbai (Andheri)" ? "Mumbai" : loc.city;
                  return (
                    <span key={loc.city}>
                      {i > 0 && <span className="mx-[6px] text-[#c4a02f]">•</span>}
                      {displayName}
                    </span>
                  );
                })}
            </p>
          </div>
        </div>
      </div>

      {/* Download Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleDownloadPDF}
          className="rounded-lg bg-[#1a2b5e] px-8 py-3 text-sm font-bold tracking-wide text-white shadow-lg transition hover:bg-[#0f1a3d] active:scale-95"
        >
          Download PDF
        </button>
        <button
          onClick={handleDownloadJPG}
          className="rounded-lg bg-[#c4a02f] px-8 py-3 text-sm font-bold tracking-wide text-white shadow-lg transition hover:bg-[#a8871f] active:scale-95"
        >
          Download JPG
        </button>
      </div>
    </div>
  );
}
