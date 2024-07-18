import React, { useState } from "react";
import "../index.css";

export default function SignupUI() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    name: "",
    email: "",
    phone: "",
  });

  const [checkboxes, setCheckboxes] = useState({
    all: false,
    service: false,
    privacy: false,
    marketing: false,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (name) => {
    if (name === "all") {
      const newValue = !checkboxes.all;
      setCheckboxes({
        all: newValue,
        service: newValue,
        privacy: newValue,
        marketing: newValue,
      });
    } else {
      setCheckboxes((prev) => {
        const newCheckboxes = { ...prev, [name]: !prev[name] };
        const allChecked = Object.keys(newCheckboxes).every(
          (key) => key === "all" || newCheckboxes[key]
        );
        return { ...newCheckboxes, all: allChecked };
      });
    }
  };

  const CheckboxItem = ({ name, label }) => (
    <div className="custom-checkbox">
      <label htmlFor={`checkbox-${name}`}>
        <input
          type="checkbox"
          id={`checkbox-${name}`}
          checked={checkboxes[name]}
          onChange={() => handleCheckboxChange(name)}
        />
        <span className="checkmark">
          <svg viewBox="0 0 20 20">
            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
          </svg>
        </span>
        <span className="label-text">{label}</span>
      </label>
    </div>
  );

  const InputField = ({ label, name, placeholder, type = "text" }) => (
    <div className="flex items-center mb-4">
      <label className="w-24 text-right mr-4">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleInputChange}
        className="flex-grow border rounded p-2"
      />
      {name === "username" && (
        <button className="ml-2 bg-teal-500 text-white px-4 py-2 rounded">
          중복확인
        </button>
      )}
    </div>
  );

  return (
    <div className="font-['Pretendard'] w-[50%] mx-auto">
      <h2 className="text-2xl font-semibold text-center my-8">회원가입</h2>
      <div className="w-full border-b-2 border-black pb-2 mb-8">
        <div className="flex float-right">
          <div className="text-[#FF8F8F] text-2xl mr-1">*</div>필수입력사항
        </div>
      </div>
      <form className="space-y-6">
        <InputField
          label="아이디"
          name="username"
          placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합"
        />
        <InputField
          label="비밀번호"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          type="password"
        />
        <InputField
          label="비밀번호 확인"
          name="passwordConfirm"
          placeholder="비밀번호를 한번 더 입력해주세요"
          type="password"
        />
        <InputField
          label="이름"
          name="name"
          placeholder="이름을 입력해주세요"
        />
        <InputField
          label="이메일"
          name="email"
          placeholder="예: shopping@naver.com"
        />
      </form>
      <div className="border-t-2 border-[#bababa] mt-8 pt-8">
        <div className="flex justify-center w-[100%] border-t-2 py-8 border-[#bababa]">
          <div className="mt-4 mr-4">이용약관동의</div>
          <div className="checkbox-group flex flex-col">
            <div className="flex items-center">
              <CheckboxItem
                name="all"
                label="전체 동의합니다"
                className="text-2xl"
              />
              <div className="ml-8 justify-end">약관보기 &#62;</div>
            </div>
            <div className="flex items-center">
              <CheckboxItem
                name="service"
                label="서비스 이용약관 동의 (필수)"
              />
              <div className="ml-8 justify-end">약관보기 &#62;</div>
            </div>
            <div className="flex items-center">
              <CheckboxItem
                name="privacy"
                label="개인정보 수집 • 이용 동의 (필수)"
              />
              <div className="ml-8 justify-end">약관보기 &#62;</div>
            </div>
            <div className="flex items-center">
              <CheckboxItem name="marketing" label="마케팅 수신 동의 (선택)" />
              <div className="ml-8 justify-end">약관보기 &#62;</div>
            </div>
          </div>
        </div>
        <button className="w-[20%] h-12 font-medium bg-[#47a5a5] text-white mx-auto mt-12 mb-24">
          가입하기
        </button>
      </div>
    </div>
  );
}
