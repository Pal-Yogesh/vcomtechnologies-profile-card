"use client";

import type { ProfileData } from "./page";
import { officeAddresses } from "./officeAddresses";

interface Props {
  data: ProfileData;
  setData: (d: ProfileData) => void;
}

export default function ProfileForm({ data, setData }: Props) {
  const update = (key: keyof ProfileData, value: string) => {
    setData({ ...data, [key]: value });
  };

  const updateSocial = (key: keyof ProfileData["socialMedia"], value: string) => {
    setData({ ...data, socialMedia: { ...data.socialMedia, [key]: value } });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 10);
    update("phone", raw);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        update("profileImage", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOfficeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = officeAddresses.find((o) => o.city === e.target.value);
    if (selected) {
      update("officeAddress", `${selected.address}`);
    }
  };

  const inputCls =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#1a2b5e] focus:ring-2 focus:ring-[#1a2b5e]/20";
  const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500";

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-[#1a2b5e]">Fill Details</h2>
        <img src="/logo.png" alt="VCOM" className="h-[40px] w-auto object-contain" />
      </div>

      {/* Profile Picture */}
      <div className="mb-5">
        <label className={labelCls}>Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-full file:border-0 file:bg-[#1a2b5e]/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#1a2b5e] hover:file:bg-[#1a2b5e]/20"
        />
      </div>

      {/* Name */}
      <div className="mb-5">
        <label className={labelCls}>Name</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => update("name", e.target.value)}
          className={inputCls}
        />
      </div>

      {/* Designation */}
      <div className="mb-5">
        <label className={labelCls}>Designation</label>
        <input
          type="text"
          value={data.designation}
          onChange={(e) => update("designation", e.target.value)}
          className={inputCls}
        />
      </div>

      {/* Phone */}
      <div className="mb-5">
        <label className={labelCls}>Phone No</label>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-700">
            +91
          </span>
          <input
            type="tel"
            value={data.phone}
            onChange={handlePhoneChange}
            maxLength={10}
            className={inputCls}
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-5">
        <label className={labelCls}>Email ID</label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputCls}
        />
      </div>

      {/* Office Address Dropdown */}
      <div className="mb-5">
        <label className={labelCls}>Office Address (Location)</label>
        <select
          onChange={handleOfficeSelect}
          defaultValue=""
          className={inputCls}
        >
          <option value="" disabled>
            Select office location
          </option>
          {officeAddresses
            .filter((loc) => !["Mumbai (Vile Parle)", "Gurgaon", "Greater Noida"].includes(loc.city))
            .map((loc) => (
              <option key={loc.city} value={loc.city}>
                {loc.city === "Mumbai (Andheri)" ? "Mumbai" : loc.city}
              </option>
            ))}
        </select>
        {data.officeAddress && (
          <p className="mt-2 rounded-md bg-gray-50 p-3 text-xs text-gray-600">
            {data.officeAddress}
          </p>
        )}
      </div>

      {/* Social Media */}
      <div className="mb-2">
        <h3 className="mb-3 text-sm font-bold text-[#1a2b5e]">Social Media Links</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>LinkedIn</label>
            <input
              type="url"
              value={data.socialMedia.linkedin}
              onChange={(e) => updateSocial("linkedin", e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Twitter / X</label>
            <input
              type="url"
              value={data.socialMedia.twitter}
              onChange={(e) => updateSocial("twitter", e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Facebook</label>
            <input
              type="url"
              value={data.socialMedia.facebook}
              onChange={(e) => updateSocial("facebook", e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Instagram</label>
            <input
              type="url"
              value={data.socialMedia.instagram}
              onChange={(e) => updateSocial("instagram", e.target.value)}
              className={inputCls}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
