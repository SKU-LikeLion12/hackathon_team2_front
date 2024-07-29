import React, { useState, useCallback } from "react";
import axios from "axios";
import Nav from "../components/nav";
import Header from "../components/header";
import Footer from "../components/footer";

const InputField = React.memo(
  ({
    label,
    name,
    placeholder,
    type = "text",
    value,
    onChange,
    onDuplicateCheck,
  }) => (
    <div className="flex items-center mb-4 w-full">
      <label className="w-36 text-left mr-5 flex-shrink-0 flex items-center">
        {label}
        <div className="text-[#FF8F8F] text-xl ml-1">*</div>
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border p-2 w-full"
      />
      {(name === "userid" || name === "emailLocalPart") && (
        <button
          onClick={onDuplicateCheck}
          className="ml-4 bg-[#47a5a5] text-white px-4 py-2 flex-shrink-0"
        >
          중복확인
        </button>
      )}
    </div>
  )
);

const EmailInput = React.memo(
  ({ emailLocalPart, emailDomain, onChange, onDuplicateCheck }) => (
    <div className="flex items-center mb-4 w-full">
      <label className="w-36 text-left mr-5 flex-shrink-0 flex items-center">
        이메일
        <div className="text-[#FF8F8F] text-xl ml-1">*</div>
      </label>
      <div className="flex-grow flex items-center">
        <input
          type="text"
          name="emailLocalPart"
          value={emailLocalPart}
          onChange={onChange}
          className="border rounded p-2 w-full"
          placeholder="example"
        />
        <span className="mx-2">@</span>
        <select
          name="emailDomain"
          value={emailDomain}
          onChange={onChange}
          className="border rounded p-2 w-32"
        >
          <option value="선택">선택하기</option>
          <option value="gmail.com">gmail.com</option>
          <option value="naver.com">naver.com</option>
          <option value="daum.net">daum.net</option>
        </select>
        <button
          onClick={onDuplicateCheck}
          className="ml-4 bg-[#47a5a5] text-white px-4 py-2 flex-shrink-0"
        >
          중복확인
        </button>
      </div>
    </div>
  )
);

const CheckboxItem = React.memo(({ name, label, checked, onChange }) => (
  <div className="custom-checkbox flex justify-between w-full">
    <label htmlFor={`checkbox-${name}`} className="flex items-center w-[400px]">
      <input
        type="checkbox"
        id={`checkbox-${name}`}
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      <span className="checkmark flex-shrink-0 mr-2">
        <svg viewBox="0 0 20 20" className="w-4 h-4">
          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
        </svg>
      </span>
      <span className="label-text flex-grow">{label}</span>
    </label>
    <div className="ml-4 text-right text-[#47a5a5] cursor-pointer">
      약관보기 &#62;
    </div>
  </div>
));

export default function SignUp() {
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
    passwordConfirm: "",
    name: "",
    emailLocalPart: "",
    emailDomain: "선택",
    phone: "",
  });

  const [checkboxes, setCheckboxes] = useState({
    all: false,
    service: false,
    privacy: false,
    marketing: false,
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  const handleCheckboxChange = useCallback(
    (name) => {
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
    },
    [checkboxes]
  );

  const handleDuplicateCheck = useCallback((field) => {
    // Implement duplicate check logic here
    console.log(`Checking duplicate for ${field}`);
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const {
      userid,
      password,
      passwordConfirm,
      name,
      emailLocalPart,
      emailDomain,
      phone,
    } = formData;

    if (password !== passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }

    const email = `${emailLocalPart}@${emailDomain}`;
    const data = {
      userid,
      password,
      name,
      email,
      phone,
    };

    try {
      const response = await axios.post(
        "https://localhost:3000/member/signup",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("회원가입 성공:", response.data);
      alert("회원가입 성공!");
      // 회원가입 성공 후 추가 작업
    } catch (error) {
      console.error(
        "회원가입 실패:",
        error.response ? error.response.data : error.message
      );
      alert(
        "회원가입 실패: " +
          (error.response ? error.response.data : error.message)
      );
    }
  };

  return (
    <div>
      <div className="font-['Pretendard'] w-full max-w-2xl mx-auto pb-12">
        <h2 className="text-2xl font-semibold text-center my-8">회원가입</h2>
        <div className="w-full h-8 border-b-2 border-black pb-2 mb-8">
          <div className="flex float-right">
            <div className="text-[#FF8F8F] text-2xl mr-1">*</div>필수입력사항
          </div>
        </div>
        <div className="flex justify-center">
          <form className="space-y-6 w-full" onSubmit={handleSignUp}>
            <InputField
              label="아이디"
              name="userid"
              placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합"
              value={formData.userid}
              onChange={handleInputChange}
              onDuplicateCheck={() => handleDuplicateCheck("userid")}
            />
            <InputField
              label="비밀번호"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <InputField
              label="비밀번호 확인"
              name="passwordConfirm"
              placeholder="비밀번호를 한번 더 입력해주세요"
              type="password"
              value={formData.passwordConfirm}
              onChange={handleInputChange}
            />
            <InputField
              label="이름"
              name="name"
              placeholder="이름을 입력해주세요"
              value={formData.name}
              onChange={handleInputChange}
            />
            <EmailInput
              emailLocalPart={formData.emailLocalPart}
              emailDomain={formData.emailDomain}
              onChange={handleInputChange}
              onDuplicateCheck={() => handleDuplicateCheck("email")}
            />
            {/* Add more fields as necessary */}
            <div className="flex flex-col mt-8 pt-8 border-t-2 border-[#bababa]">
              <div className="w-36 mb-4">이용약관동의</div>
              <div className="checkbox-group flex flex-col space-y-4">
                {Object.entries(checkboxes).map(([name, checked]) => (
                  <CheckboxItem
                    key={name}
                    name={name}
                    label={
                      name === "all"
                        ? "전체 동의합니다"
                        : name === "service"
                        ? "서비스 이용약관 동의 (필수)"
                        : name === "privacy"
                        ? "개인정보 수집 • 이용 동의 (필수)"
                        : "마케팅 수신 동의 (선택)"
                    }
                    checked={checked}
                    onChange={() => handleCheckboxChange(name)}
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full h-12 font-medium bg-[#47a5a5] text-white mx-auto mt-12 mb-24"
            >
              가입하기
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
