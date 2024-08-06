// SignUp.js
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import Footer from "../components/footer";

const API_URL = process.env.REACT_APP_API_URL;

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
    <div className="flex items-center w-full mb-4">
      <label className="flex items-center flex-shrink-0 mr-5 text-left w-36">
        {label}
        <div className="text-[#FF8F8F] text-xl ml-1">*</div>
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 border"
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
    <div className="flex items-center w-full mb-4">
      <label className="flex items-center flex-shrink-0 mr-5 text-left w-36">
        이메일
        <div className="text-[#FF8F8F] text-xl ml-1">*</div>
      </label>
      <div className="flex items-center flex-grow">
        <input
          type="text"
          name="emailLocalPart"
          value={emailLocalPart}
          onChange={onChange}
          className="w-full p-2 border rounded"
          placeholder="example"
        />
        <span className="mx-2">@</span>
        <select
          name="emailDomain"
          value={emailDomain}
          onChange={onChange}
          className="w-32 p-2 border rounded"
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
  <div className="flex justify-between w-full custom-checkbox">
    <label htmlFor={`checkbox-${name}`} className="flex items-center w-[400px]">
      <input
        type="checkbox"
        id={`checkbox-${name}`}
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      <span className="flex-shrink-0 mr-2 checkmark">
        <svg viewBox="0 0 20 20" className="w-4 h-4">
          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
        </svg>
      </span>
      <span className="flex-grow label-text">{label}</span>
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

  const { login } = useAuth();
  const navigate = useNavigate();

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
    } = formData;

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }

    const email =
      emailDomain !== "선택" ? `${emailLocalPart}@${emailDomain}` : "";

    if (!userid || !password || !passwordConfirm || !name || !email) {
      alert("모든 필수 입력 사항을 입력해 주세요.");
      return;
    }

    const data = {
      userId: userid,
      password,
      nickName: name,
      eleMail: email,
    };

    try {
      const response = await axios.post(`${API_URL}/member/signUp`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("회원가입 성공:", response.data);

      // 회원가입 성공 후 축하 메시지 표시
      alert(`회원가입을 축하드립니다! ${formData.name}님! 로그인 해주세요.`);

      // 로그인 페이지로 이동
      navigate("/login");
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
        <h2 className="my-8 text-2xl font-semibold text-center">회원가입</h2>
        <div className="w-full h-8 pb-2 mb-8 border-b-2 border-black">
          <div className="flex float-right">
            <div className="text-[#FF8F8F] text-2xl mr-1">*</div>필수입력사항
          </div>
        </div>
        <div className="flex justify-center">
          <form className="w-full space-y-6" onSubmit={handleSignUp}>
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
            <div className="flex flex-col mt-8 pt-8 border-t-2 border-[#bababa]">
              <div className="flex mb-4">
                <label className="text-left w-[88px]">이용약관동의</label>
                <div className="text-[#FF8F8F] text-xl">*</div>
              </div>
              <CheckboxItem
                name="all"
                label="전체 동의합니다."
                checked={checkboxes.all}
                onChange={() => handleCheckboxChange("all")}
              />
              <div className="space-y-2 ml-7">
                <CheckboxItem
                  name="service"
                  label="이용 약관 동의 (필수)"
                  checked={checkboxes.service}
                  onChange={() => handleCheckboxChange("service")}
                />
                <CheckboxItem
                  name="privacy"
                  label="개인정보 수집 및 이용 동의 (필수)"
                  checked={checkboxes.privacy}
                  onChange={() => handleCheckboxChange("privacy")}
                />
                <CheckboxItem
                  name="marketing"
                  label="마케팅 수신 동의 (선택)"
                  checked={checkboxes.marketing}
                  onChange={() => handleCheckboxChange("marketing")}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#47a5a5] text-white w-full max-w-[200px] h-14 rounded"
              >
                회원가입하기
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
