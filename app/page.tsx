"use client";

import { useState } from "react";
import ProfileForm from "./profile-card/ProfileForm";
import ProfileCardPreview from "./profile-card/ProfileCardPreview";

export interface ProfileData {
  profileImage: string;
  name: string;
  designation: string;
  phone: string;
  email: string;
  website: string;
  officeAddress: string;
  socialMedia: {
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
  };
}

const defaultData: ProfileData = {
  profileImage: "",
  name: "",
  designation: "",
  phone: "",
  email: "",
  website: "",
  officeAddress: "",
  socialMedia: {
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
  },
};

export default function ProfileCardPage() {
  const [data, setData] = useState<ProfileData>(defaultData);

  return (
    <div className="min-h-screen bg-[#f0f2f5] px-4 py-10" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <h1 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-[#1a2b5e]">
        Profile Card Generator
      </h1>

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-10 xl:grid-cols-[420px_1fr]">
        {/* Form on left */}
        <ProfileForm data={data} setData={setData} />

        {/* Card preview on right */}
        <div className="flex flex-col items-center">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-[#1a2b5e]/60">
            Live Preview
          </h2>
          <ProfileCardPreview data={data} />
        </div>
      </div>
    </div>
  );
}
