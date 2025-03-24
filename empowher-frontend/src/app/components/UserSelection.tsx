"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface UserSelectionProps {
  onComplete: (gender: string, region: string) => void;
}

export default function UserSelection({ onComplete }: UserSelectionProps) {
  const [gender, setGender] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gender || !region) {
      setError("Please select both gender and state");
      return;
    }

    // Store in localStorage
    localStorage.setItem("userGender", gender);
    localStorage.setItem("userRegion", region);

    onComplete(gender, region);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#450C1C] to-[#D2042D] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#450C1C]">
            Welcome to EmpowHer
          </h2>
          <p className="mt-2 text-[#7D0D2C]">Please tell us about yourself</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[#450C1C] font-medium mb-2">
              I am a:
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setGender("female")}
                className={`w-full p-3 rounded-lg border-2 transition-colors ${
                  gender === "female"
                    ? "border-[#D2042D] bg-[#D2042D] text-white"
                    : "border-[#7D0D2C] text-[#7D0D2C] hover:bg-[#D2042D]/5"
                }`}
              >
                Female
              </button>
              <button
                type="button"
                onClick={() => setGender("male")}
                className={`w-full p-3 rounded-lg border-2 transition-colors ${
                  gender === "male"
                    ? "border-[#D2042D] bg-[#D2042D] text-white"
                    : "border-[#7D0D2C] text-[#7D0D2C] hover:bg-[#D2042D]/5"
                }`}
              >
                Male
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[#450C1C] font-medium mb-2">
              Select your state:
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-[#7D0D2C] text-[#7D0D2C] focus:border-[#D2042D] focus:outline-none"
            >
              <option value="">Select a state</option>
              <option value="andhra-pradesh">Andhra Pradesh</option>
              <option value="arunachal-pradesh">Arunachal Pradesh</option>
              <option value="assam">Assam</option>
              <option value="bihar">Bihar</option>
              <option value="chhattisgarh">Chhattisgarh</option>
              <option value="goa">Goa</option>
              <option value="gujarat">Gujarat</option>
              <option value="haryana">Haryana</option>
              <option value="himachal-pradesh">Himachal Pradesh</option>
              <option value="jharkhand">Jharkhand</option>
              <option value="karnataka">Karnataka</option>
              <option value="kerala">Kerala</option>
              <option value="madhya-pradesh">Madhya Pradesh</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="manipur">Manipur</option>
              <option value="meghalaya">Meghalaya</option>
              <option value="mizoram">Mizoram</option>
              <option value="nagaland">Nagaland</option>
              <option value="odisha">Odisha</option>
              <option value="punjab">Punjab</option>
              <option value="rajasthan">Rajasthan</option>
              <option value="sikkim">Sikkim</option>
              <option value="tamil-nadu">Tamil Nadu</option>
              <option value="telangana">Telangana</option>
              <option value="tripura">Tripura</option>
              <option value="uttar-pradesh">Uttar Pradesh</option>
              <option value="uttarakhand">Uttarakhand</option>
              <option value="west-bengal">West Bengal</option>
              <option value="delhi">Delhi</option>
              <option value="jammu-kashmir">Jammu and Kashmir</option>
              <option value="ladakh">Ladakh</option>
              <option value="puducherry">Puducherry</option>
              <option value="andaman-nicobar">
                Andaman and Nicobar Islands
              </option>
              <option value="chandigarh">Chandigarh</option>
              <option value="dadra-nagar-haveli">
                Dadra and Nagar Haveli and Daman and Diu
              </option>
              <option value="lakshadweep">Lakshadweep</option>
            </select>
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#D2042D] text-white py-3 rounded-lg hover:bg-[#A8092D] transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
