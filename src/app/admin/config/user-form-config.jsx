export const residentFormFields = [
  // Personal Information Section
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    required: true,
    gridClassName: "md:col-span-1",
  },
  {
    name: "middleName",
    label: "Middle Name",
    type: "text",
    gridClassName: "md:col-span-1",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
    gridClassName: "md:col-span-1",
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    required: true,
    gridClassName: "md:col-span-1",
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    required: true,
    options: [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" },
    ],
    gridClassName: "md:col-span-1",
  },
  {
    name: "civilStatus",
    label: "Civil Status",
    type: "select",
    required: true,
    options: [
      { value: "Single", label: "Single" },
      { value: "Married", label: "Married" },
      { value: "Divorced", label: "Divorced" },
      { value: "Widowed", label: "Widowed" },
    ],
    gridClassName: "md:col-span-1",
  },

  // Contact Information
  {
    name: "address",
    label: "Complete Address",
    type: "textarea",
    required: true,
    placeholder: "House No., Street, Sitio, Barangay, City, Province",
    rows: 3,
    gridClassName: "md:col-span-3",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
    required: true,
    placeholder: "09XXXXXXXXX",
    gridClassName: "md:col-span-1",
  },
  {
    name: "email",
    label: "Email (Optional)",
    type: "email",
    gridClassName: "md:col-span-2",
  },
  {
    name: "emergencyContact",
    label: "Emergency Contact",
    type: "text",
    required: true,
    gridClassName: "md:col-span-1",
  },
  {
    name: "emergencyPhone",
    label: "Emergency Phone",
    type: "text",
    required: true,
    gridClassName: "md:col-span-2",
  },

  // Economic Information
  {
    name: "occupation",
    label: "Occupation",
    type: "text",
    required: true,
    gridClassName: "md:col-span-1",
  },
  {
    name: "familyMembers",
    label: "Family Members",
    type: "number",
    defaultValue: 1,
    gridClassName: "md:col-span-1",
  },

  // Government IDs
  {
    name: "voterIdNumber",
    label: "Voter ID Number (Optional)",
    type: "text",
    gridClassName: "md:col-span-1",
  },
  {
    name: "philhealthNumber",
    label: "PhilHealth Number (Optional)",
    type: "text",
    placeholder: "XX-XXXXXXXXX-X",
    gridClassName: "md:col-span-1",
  },
  {
    name: "sssNumber",
    label: "SSS Number (Optional)",
    type: "text",
    placeholder: "XX-XXXXXXX-X",
    gridClassName: "md:col-span-1",
  },
  {
    name: "tinNumber",
    label: "TIN Number (Optional)",
    type: "text",
    placeholder: "XXX-XXX-XXX-XXX",
    gridClassName: "md:col-span-1",
  },

  // Special Status Checkboxes
  {
    name: "isSenior",
    label: "Special Status",
    type: "checkbox",
    checkboxLabel: "Senior Citizen (60+ years old)",
    gridClassName: "md:col-span-1",
  },
  {
    name: "isPwd",
    type: "checkbox",
    checkboxLabel: "Person with Disability (PWD)",
    gridClassName: "md:col-span-1",
  },
  {
    name: "isPregnant",
    type: "checkbox",
    checkboxLabel: "Pregnant (if applicable)",
    gridClassName: "md:col-span-1",
  },
  {
    name: "isVoter",
    type: "checkbox",
    checkboxLabel: "Registered Voter",
    gridClassName: "md:col-span-1",
  },
];

export const userFormFields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    required: true,
    gridClassName: "md:col-span-1",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
    gridClassName: "md:col-span-1",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    gridClassName: "md:col-span-2",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
    required: true,
    gridClassName: "md:col-span-1",
  },
  {
    name: "address",
    label: "Address",
    type: "textarea",
    required: true,
    rows: 3,
    gridClassName: "md:col-span-2",
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    required: true,
    gridClassName: "md:col-span-1",
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    required: true,
    options: [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" },
    ],
    gridClassName: "md:col-span-1",
  },
  {
    name: "civilStatus",
    label: "Civil Status",
    type: "select",
    required: true,
    options: [
      { value: "Single", label: "Single" },
      { value: "Married", label: "Married" },
      { value: "Divorced", label: "Divorced" },
      { value: "Widowed", label: "Widowed" },
    ],
    gridClassName: "md:col-span-1",
  },
  {
    name: "occupation",
    label: "Occupation",
    type: "text",
    required: true,
    gridClassName: "md:col-span-1",
  },
  {
    name: "isActive",
    label: "Account Status",
    type: "checkbox",
    checkboxLabel: "Account Active",
    gridClassName: "md:col-span-2",
  },
];

export const pendingProcessFormFields = [
  {
    name: "action",
    label: "Action",
    type: "radio",
    required: true,
    options: [
      {
        value: "approve",
        label: "Approve Application",
        className: "text-success",
      },
      {
        value: "reject",
        label: "Reject Application",
        className: "text-destructive",
      },
      {
        value: "request_more",
        label: "Request More Information",
        className: "text-warning",
      },
    ],
    gridClassName: "col-span-full",
  },
  {
    name: "reason",
    label: "Reason for Rejection",
    type: "select",
    options: [
      { value: "incomplete_documents", label: "Incomplete Documents" },
      { value: "invalid_residency", label: "Invalid Residency Proof" },
      { value: "duplicate_account", label: "Duplicate Account" },
      { value: "invalid_information", label: "Invalid Information" },
      { value: "other", label: "Other" },
    ],
    gridClassName: "col-span-full",
    // Show only when action is "reject"
    render: (value, handleInputChange, formData) => {
      if (formData?.action !== "reject") return null;
      return (
        <select
          value={value}
          onChange={(e) => handleInputChange("reason", e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select reason</option>
          <option value="incomplete_documents">Incomplete Documents</option>
          <option value="invalid_residency">Invalid Residency Proof</option>
          <option value="duplicate_account">Duplicate Account</option>
          <option value="invalid_information">Invalid Information</option>
          <option value="other">Other</option>
        </select>
      );
    },
  },
  {
    name: "notes",
    label: "Notes",
    type: "textarea",
    placeholder: "Add notes about your decision...",
    rows: 4,
    gridClassName: "col-span-full",
  },
];
