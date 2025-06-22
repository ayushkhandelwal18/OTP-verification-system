import { useState } from 'react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    otp: '',
  });
  const [showOtpField, setShowOtpField] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/v1/sendotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();
      if (data.success) {
        setShowOtpField(true);
        alert('OTP sent successfully ✅');
      } else {
        alert(data.message || 'Failed to send OTP ❌');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Something went wrong ❌');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords don't match ❌");
    }

    try {
      const res = await fetch('http://localhost:4000/api/v1/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        alert('User registered successfully ✅');
        // Optionally reset
      } else {
        alert(data.message || 'Signup failed ❌');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Something went wrong ❌');
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          placeholder="John Doe"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          placeholder="your@email.com"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          placeholder="••••••••"
          required
        />
      </div>

         <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
       < input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          placeholder="••••••••"
          required
        />
      </div>

 
      


      <div className="space-y-2">
  <label className="block text-sm font-medium text-gray-300">Select Role</label>
  <select
    name="role"
    value={formData.role}
    onChange={handleChange}
    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
    required
  >
     <option value="">Select a role</option>
    <option value="Admin">Admin</option>
    <option value="Employee">Employee</option>
    <option value="Visitor">Visitor</option>
  </select>
</div>


      {!showOtpField ? (
        <button
          onClick={handleSendOtp}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
        >
          Send OTP
        </button>
      ) : (
        <>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">OTP (6 digits)</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="123456"
              maxLength="6"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
          >
            Verify & Register
          </button>
        </>
      )}
    </form>
  );
};

export default SignupForm;
