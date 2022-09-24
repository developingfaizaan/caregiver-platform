const Select = ({ label, value, onChange }) => {
  return (
    <div className="my-6">
      <label htmlFor={label} className={`block mb-2 text-white700 text-md`}>{label}</label>
      <select id={label} onChange={onChange} value={value} className={`py-3 px-4 font-poppins font-medium text-gray900 bg-white border-2 border-white200 rounded-[4px] outline-none focus:outline-primary ease-out duration-200 w-full placeholder:normal placeholder:text-white400`}>
        <option value="family">Family</option>
        <option value="agency">Agency</option>
        <option value="caregiver">Caregiver</option>
      </select>
    </div>
  );
};

export default Select;
