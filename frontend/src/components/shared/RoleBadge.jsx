const roleLabels = {
  admin: 'Admin',
  hr_officer: 'HR Officer',
  payroll_officer: 'Payroll Officer',
  employee: 'Employee',
};

export default function RoleBadge({ role }) {
  return (
    <span className={`chip-${role} inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold`}>
      {roleLabels[role] || role}
    </span>
  );
}
