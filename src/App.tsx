// @ts-nocheck
import React, { useState, useMemo, useEffect } from 'react';
import {
  User,
  Wallet,
  Calendar,
  Info,
  Clock,
  Stethoscope,
  ShieldCheck,
  ChevronRight,
  Phone,
  UserCircle,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  MapPin,
  Map,
  Mail,
  History,
  Lock,
  Unlock,
  Plus,
  Search,
  Download,
  FileText,
  Check,
  X,
  LogOut,
  Building,
  Edit3,
  KeyRound,
  Eye,
  Trash2,
  Settings,
  Sun,
  Moon,
  Globe,
  Bell,
  UserCheck,
  UserX,
} from 'lucide-react';

// --- FIREBASE IMPORTS ---
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithCustomToken,
  signInAnonymously,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  query,
  addDoc,
} from 'firebase/firestore';

// --- FIREBASE INIT ---
const firebaseConfig =
  typeof __firebase_config !== 'undefined'
    ? JSON.parse(__firebase_config)
    : {
        apiKey: 'AIzaSyBprjnMwktHubCAv3Vg1jc__JYhPE5Zw-Q',
        authDomain: 'hr-system-f0e89.firebaseapp.com',
        projectId: 'hr-system-f0e89',
        storageBucket: 'hr-system-f0e89.firebasestorage.app',
        messagingSenderId: '248152893238',
        appId: '1:248152893238:web:b8b5c1ed47ab1df6e13597',
      };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId =
  typeof __app_id !== 'undefined' ? __app_id : 'ag-health-hr-system';

// --- CONSTANTS ---
const ADMIN_CREDENTIALS = [
  {
    user: 'Amy4777',
    pass: 'Amy4777',
    company: 'AG Health Enterprise',
    type: 'ADMIN',
  },
  {
    user: 'Jeffer2779',
    pass: 'Jeffer2779',
    company: 'Health Genexis Enterprise',
    type: 'ADMIN',
  },
];

// LIVE DATE (實時獲取當前現實時間)
const TODAY = new Date();
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const YEARS = ['2024', '2025', '2026', '2027', '2028', '2029', '2030'];

// --- DICTIONARY FOR TRANSLATION (TRADITIONAL CHINESE) ---
const dict = {
  'PROFILE': '個人資料',
  'LEAVE APPLICATION': '請假申請',
  'PAYROLL': '工資單',
  'ADMIN PANEL': '管理面板',
  'Leave Application': '請假申請',
  'Category': '假期類別',
  'Start Date': '開始日期',
  'End Date': '結束日期',
  'Submit Request': '提交申請',
  'Optional Public Holidays (Max 6)': '可選公共假期 (最多6天)',
  'Apply': '申請',
  'Convert': '轉換',
  'Status Balances': '假期餘額',
  'Annual Leave': '年假',
  'Medical Leave': '病假',
  'Public Holiday': '公共假期',
  'Unpaid Leave': '無薪假',
  'Replacement': '補假',
  'Action History': '操作記錄',
  'Records': '條記錄',
  'No records found.': '暫無記錄。',
  'Approvals': '審批',
  'No pending requests.': '沒有待處理的請求。',
  'Chinese New Year': '農曆新年',
  'Hari Raya Aidilfitri': '開齋節',
  'Wesak Day': '衛塞節',
  'Awal Muharram': '回曆元旦',
  'Deepavali': '屠妖節',
  'Christmas Day': '聖誕節',
  
  // NEW JOHOR PUBLIC HOLIDAYS TRANSLATION
  'Thaipusam': '大寶森節',
  'Chinese New Year Eve': '除夕',
  'Chinese New Year 2nd Day': '農曆初二',
  'Awal Ramadan': '齋戒月首日',
  "Sultan of Johor's Birthday": '柔佛蘇丹誕辰',
  "Agong's Birthday": '國家最高元首誕辰',
  'Hari Hol of Sultan Iskandar': '蘇丹忌日',
  'Labour Day': '勞動節',
  'National Day': '國慶日',
  'Malaysia Day': '馬來西亞日',
  'Johor Public Holidays Registry': '柔佛公共假期管理 (Johor PH)',

  // HOLIDAY SWAP TRANSLATION
  'Holiday Swapping': '公共假期替工 (Holiday Swap)',
  'Select Holiday': '選擇公共假期',
  'Work on Holiday': '公共假期替工',

  'Management Portal': '管理門戶',
  'Sign In': '登入',
  'Username': '用戶名',
  'Password': '密碼',
  'Create Account': '創建賬號',
  'Initialize New Staff': '初始化新員工',
  'Company Profile Settings': '公司資料設置',
  'Staff Designation Registry': '員工職位管理',
  'Payroll Engine': '工資核算引擎',
  'Generate Payslip': '生成工資單',
  'Optional Public Holidays Registry': '可選公共假期管理',
  'Status: Confirmed Employment': '狀態：已確認正式員工',
  'Status: Probation Period': '狀態：試用期',
  'Employee Portion (Deduct)': '員工扣除部分',
  'Employer Portion (Company)': '雇主繳納部分',
  'Total Deduct': '總扣除',
  'Total Contrib': '總繳納',
  'Career Tracker': '職業追蹤',
  'Aggregated since day 1.': '從第一天起累計。',
  'Total Basic': '總底薪',
  'Total Comm': '總提成',
  'Total EPF': '總公積金',
  'Tenure': '工齡',
  'Months': '個月',
  'Requested Changes to Staff Data': '要求更改員工數據',
  'PH Selection': '公共假期選擇',
  'Holidays to RL': '天假期轉為補假',
  'Applied Date :': '申請日期：',
  'Estimated Net Basic': '預計淨底薪',
  'Johor Public Holidays 2026': '2026年柔佛公共假期',
  'Payslip Record': '工資單記錄',
  'No records generated.': '沒有生成記錄。',
  'Export': '導出',
  'View': '查看',
  'Action': '操作',
  'Period': '期間',
  'Basic RM': '底薪 RM',
  'Commission': '提成',
  'Net Total': '淨收入',
  'PDF': 'PDF',
  'Company Name': '公司名稱',
  'SSM No.': '公司註冊號 (SSM)',
  'Tax No.': '稅號',
  'Update Settings': '更新設置',
  'Enter new designation...': '輸入新職位...',
  'Add': '添加',
  'Holiday Name (e.g. Thaipusam)...': '假期名稱(如：大寶森節)...',
  'Date (e.g. Jan 25)': '日期(如：Jan 25)',
  'Employment Offer Letter': '錄用通知書',
  'Confirmation Letter': '轉正信',
  'Increment Letter': '加薪信',
  'Warning Letter': '警告信',
  'Generate for': '生成給',
  'EXPORT PDF': '導出 PDF',
  'Payslip Preview -': '工資單預覽 -',
  'Official Document': '官方文件',
  'Employee:': '員工：',
  'Period:': '期間：',
  'Basic Salary:': '基本工資：',
  'Total Deductions:': '總扣除額：',
  'Nett Income': '淨收入',
  'GENERATING PDF...': '生成PDF中...',
  'DOWNLOAD PDF COPY': '下載PDF副本',
  'Set Username': '設置用戶名',
  'Set Password': '設置密碼',
  'Update Details': '更新詳細信息',
  'Legal Name': '法定姓名',
  'Contact No.': '聯繫電話',
  'IC Number': '身份證號',
  'Gender': '性別',
  'Male': '男',
  'Female': '女',
  'Designation': '職位',
  'Join Date': '入職日期',
  'Probation End Date': '試用期結束日期',
  'EPF ID': '公積金賬號',
  'SOCSO ID': '社險賬號',
  'Monthly Basic (RM)': '月基本工資 (RM)',
  'Cancel': '取消',
  'Save Changes': '保存更改',
  'Reject Application': '拒絕申請',
  'Reason (Optional)': '原因 (可選)',
  'Confirm Reject': '確認拒絕',
  'Cancel Application': '取消申請',
  'Are you sure you want to cancel this request?': '您確定要取消此請求嗎？',
  'Back': '返回',
  'Confirm': '確認',
  'Select Target Date': '選擇目標日期',
  'Submit': '提交',
  'Status': '狀態',
  'No data.': '無數據。',
  'Probation Policy': '試用期政策',
  'Handle Annual Leave count?': '處理年假計算？',
  'Proceed Counting AL': '繼續計算年假',
  'Waive (Ignore) AL': '豁免(忽略)年假',
  'Staff Access Selection': '員工權限選擇',
  'Headcount:': '總人數：',
  'Active': '活躍',
  'CREATE': '創建',
  'Ref:': '參考號：',
  'Days': '天',
  'Days Taken': '已用天數',
  'No Staff Record Found': '未找到員工記錄',
  'Please click "CREATE STAFF" to initialize the database.': '請點擊"創建"來初始化數據庫。',
  'Comm': '提成',
  'Bonus': '獎金',
  'Request': '請求',
  'Contact': '聯繫方式',
  'IC Identity': '身份證號',
  'Prob. End Date': '試用期結束',
  'Monthly Basic': '月基本工資',
  'Daily Rate': '日工資率',
  'EPF (11%)': '公積金 (11%)',
  'SOCSO': '社險 (SOCSO)',
  'EIS': '就業保險 (EIS)',
  'EPF (13%)': '公積金 (13%)',
  'System Notification': '系統通知',
  'OK': '確定',
  'Dates are required.': '請選擇日期。',
  'Record Updated Successfully.': '記錄更新成功。',
  'Application Submitted / 已提交申请': '申請已提交。',
  'Maximum 6 optional Public Holidays can be selected.': '最多只能選擇 6 個可選公共假期。',
  'Select new holidays first.': '請先選擇需要轉換的假期。',
  'Please specify the target date.': '請指定目標日期。',
  'Update Submitted for Admin Approval.': '資料更新已提交，等待管理員審批。',
  'Staff account created.': '員工賬號創建成功。',
  'Select staff member.': '請選擇要操作的員工。',
  'Record Deleted.': '記錄已刪除。',
  'Company Info Updated.': '公司信息已成功更新。',
  'Cancelled.': '已成功取消。',
  'January': '一月', 'February': '二月', 'March': '三月', 'April': '四月', 
  'May': '五月', 'June': '六月', 'July': '七月', 'August': '八月', 
  'September': '九月', 'October': '十月', 'November': '十一月', 'December': '十二月',
  'Approve': '批准',
  'Reject': '拒絕',
  'PENDING': '待處理',
  'APPROVED': '已批准',
  'REJECTED': '已拒絕',
  'CANCELLED': '已取消',
  'Approved Records': '已批准記錄',

  // === NEW ADDITIONS ===
  'Special Leave': '世假',
  'Extra Leave': '特批假',
  'Half Day': '半天',
  'Full Day': '全天',
  'Duration': '天數',
  'Special Request': '特批申請',
  'Mark as Extra Leave': '標記為特批假',
  'Immediate Family (3 days)': '直屬 (3天)',
  'Grandparent (1 day)': '外公外婆 (1天)',
  'Resigned': '已離職',
  'Confirm Employment': '確認轉正',
  'Extend Probation': '延長試用期',
  'Probation Ended': '試用期結束',
};

// --- GLOBAL CSS INJECTION ---
const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  
  html, body, #root {
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    max-width: none !important;
    display: block !important;
    background-color: #f8fafc;
  }

  * { font-family: 'Inter', system-ui, sans-serif !important; }
  
  .custom-scrollbar::-webkit-scrollbar { width: 6px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
  
  input[type="checkbox"].custom-checkbox {
    -webkit-appearance: none !important;
    appearance: none !important;
    background-color: #ffffff !important;
    width: 18px !important;
    height: 18px !important;
    border: 2px solid #cbd5e1 !important;
    border-radius: 4px !important;
    display: inline-grid !important;
    place-content: center !important;
    cursor: pointer;
    margin: 0 !important;
  }
  input[type="checkbox"].custom-checkbox::before {
    content: "";
    width: 10px !important;
    height: 10px !important;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    background-color: #4f46e5 !important;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }
  input[type="checkbox"].custom-checkbox:checked::before {
    transform: scale(1);
  }

  .dark-theme, .dark-theme body, .dark-theme #root {
    background-color: #0f172a !important; 
    color: #f8fafc !important; 
  }
  .dark-theme header {
    background-color: #1e293b !important;
    border-color: #334155 !important;
  }
  .dark-theme .bg-white, .dark-theme .bg-slate-50 {
    background-color: #1e293b !important; 
    border-color: #334155 !important; 
  }
  .dark-theme .bg-slate-100 {
    background-color: #334155 !important;
  }
  .dark-theme .text-slate-900, .dark-theme .text-slate-800, .dark-theme .text-black {
    color: #f8fafc !important;
  }
  .dark-theme .text-slate-700, .dark-theme .text-slate-600 {
    color: #cbd5e1 !important;
  }
  .dark-theme .text-slate-500, .dark-theme .text-slate-400 {
    color: #94a3b8 !important;
  }
  .dark-theme .border, .dark-theme .border-b, .dark-theme .border-t, .dark-theme .border-slate-200, .dark-theme .border-slate-100 {
    border-color: #334155 !important;
  }
  .dark-theme input, .dark-theme select, .dark-theme textarea {
    background-color: #334155 !important;
    color: #f8fafc !important;
    border-color: #475569 !important;
  }
  .dark-theme input[type="checkbox"].custom-checkbox {
    background-color: #1e293b !important;
    border-color: #475569 !important;
  }

  .dark-theme .dark-theme-ignore, .dark-theme .career-tracker-box {
    background-color: #020617 !important;
  }
  .dark-theme select option {
    background-color: #1e293b !important;
    color: #f8fafc !important;
  }
  .dark-theme .select-dark-bg option {
     background-color: #020617 !important;
     color: #f8fafc !important;
  }

  /* NEW: probation notification pulse */
  .probation-badge { animation: pulse-glow 2s ease-in-out infinite; }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(245,158,11,0.4); }
    50% { box-shadow: 0 0 0 8px rgba(245,158,11,0); }
  }
`;

// --- HELPERS ---
const formatPHDateStr = (dateStr, year) => {
  const d = new Date(`${dateStr}, ${year}`);
  return d
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '-');
};

const getTypeFullName = (type) => {
  const types = {
    AL: 'Annual Leave',
    MC: 'Medical Leave',
    UPL: 'Unpaid Leave',
    RL: 'Replacement',
    PROFILE_UPDATE: 'Profile Update',
    HOLIDAY_SWAP: 'Holiday Swapping',
    // NEW
    SL: 'Special Leave',
    EXTRA: 'Extra Leave',
  };
  return types[type] || type;
};

// HR Tenure Calculator Helper (精確HR月份計算)
const getMonthsDiff = (startStr, endStr) => {
  if (!startStr || !endStr) return 0;
  const s = new Date(startStr);
  const e = new Date(endStr);
  
  let months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  return Math.max(0, months + 1);
};

// === NEW HELPER: Completed months (for accurate AL accrual - only full months count) ===
const getCompletedMonths = (joinDateStr, asOfDate) => {
  if (!joinDateStr) return 0;
  const join = new Date(joinDateStr);
  const end = asOfDate || TODAY;
  let months = (end.getFullYear() - join.getFullYear()) * 12 + (end.getMonth() - join.getMonth());
  if (end.getDate() < join.getDate()) months--;
  return Math.max(0, months);
};

// === NEW HELPER: Working days in a given month (excludes Sat & Sun) ===
const getWorkingDaysInMonth = (year, monthIdx) => {
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  let workDays = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    const day = new Date(year, monthIdx, d).getDay();
    if (day !== 0 && day !== 6) workDays++;
  }
  return workDays;
};

// === NEW HELPER: Actual working days an employee worked in their join month (pro-rate) ===
const getProRatedWorkDays = (joinDateStr, year, monthIdx) => {
  const join = new Date(joinDateStr);
  if (join.getFullYear() !== year || join.getMonth() !== monthIdx) {
    return getWorkingDaysInMonth(year, monthIdx);
  }
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  let workDays = 0;
  for (let d = join.getDate(); d <= daysInMonth; d++) {
    const day = new Date(year, monthIdx, d).getDay();
    if (day !== 0 && day !== 6) workDays++;
  }
  return workDays;
};

// === NEW HELPER: Probation end date = 3 months after join date ===
const calcProbationEnd = (joinDateStr) => {
  if (!joinDateStr) return '';
  const join = new Date(joinDateStr);
  const end = new Date(join);
  end.setMonth(end.getMonth() + 3);
  end.setDate(end.getDate() - 1);
  return end.toISOString().split('T')[0];
};

// === NEW HELPER: Is probation ending today/soon (for notification) ===
const isProbationEndingSoon = (probEndDateStr) => {
  if (!probEndDateStr) return false;
  const end = new Date(probEndDateStr);
  const diffDays = (end - TODAY) / (1000 * 60 * 60 * 24);
  return diffDays >= -1 && diffDays <= 1;
};

// Malaysian Labor Law Helper for "i" Button Info
const getLawText = (type, lang) => {
  if (lang === 'zh') {
    switch (type) {
      case 'AL': return '根據1955年勞工法令，員工享有年假：服務1-2年為8天，2-5年為12天，5年以上為16天。每做滿1個月累積0.67天，未滿1天不可申請（會被視為無薪假）。';
      case 'MC': return '根據1955年勞工法令，未住院病假：服務少於2年為14天，2-5年為18天，5年以上為22天。';
      case 'PH': return '雇主須提供至少11天法定公共假期，包含5天強制假期（國慶日、元首誕辰、蘇丹誕辰、勞動節、馬來西亞日）。';
      case 'UPL': return '無薪假須經公司批准，扣薪將根據當月實際工作天數（扣除週六日）計算每日扣薪率。';
      case 'RL': return '補假由公司政策決定，通常用於補償在公共假期或休息日的工作。';
      case 'SL': return '世假（喪假）：直屬親人（父母/兄弟姐妹/配偶/子女）3天；外公外婆1天。屬於額外有薪假期，不扣薪。';
      default: return '';
    }
  } else {
    switch (type) {
      case 'AL': return 'Employment Act 1955: Annual leave entitlement is 8 days (1-2 yrs service), 12 days (2-5 yrs), and 16 days (>5 yrs). Accrues at 0.67 days per completed month; less than 1 day accrued cannot be applied (treated as Unpaid Leave).';
      case 'MC': return 'Employment Act 1955: Sick leave (non-hospitalized) is 14 days (<2 yrs service), 18 days (2-5 yrs), and 22 days (>5 yrs).';
      case 'PH': return 'Employers must observe at least 11 gazetted public holidays, including 5 mandatory days (National Day, Agong\'s Birthday, Ruler\'s Birthday, Labour Day, Malaysia Day).';
      case 'UPL': return 'Unpaid leave is subject to management approval. Deductions are calculated based on actual working days in the month (excluding weekends).';
      case 'RL': return 'Replacement leave is granted based on company policy for work performed on public holidays or rest days.';
      case 'SL': return 'Special (Bereavement) Leave: Immediate family (parent/sibling/spouse/child) 3 days; Grandparent 1 day. This is paid leave with no deduction.';
      default: return '';
    }
  }
};

const App = () => {
  // --- AUTH STATE WITH PERSISTENCE ---
  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('hr_app_user');
      if (savedUser) return JSON.parse(savedUser);
    }
    return null;
  });
  
  const [fbUser, setFbUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ user: '', pass: '' });
  const [loginError, setLoginError] = useState('');

  // --- CUSTOM ALERT STATE ---
  const [appAlert, setAppAlert] = useState({ show: false, message: '', title: '' });
  
  const triggerAlert = (message, title = 'System Notification') => {
    setAppAlert({ show: true, message, title });
  };
  const closeAlert = () => setAppAlert({ show: false, message: '', title: '' });

  // --- THEME & LANG STATE ---
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState('en');

  const t = (text) => lang === 'zh' ? (dict[text] || text) : text;

  // --- APP STATE ---
  const [hrSubTab, setHrSubTab] = useState('PROFILE');
  const [staffList, setStaffList] = useState([]);
  const [leaveApps, setLeaveApps] = useState([]);
  const [payslips, setPayslips] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [johorPHs, setJohorPHs] = useState([]); 
  const [companyInfo, setCompanyInfo] = useState({
    name: 'AG Health Enterprise',
    ssm: '',
    tax: '',
  });

  // UI States
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedStaffId, setSelectedStaffId] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('hr_app_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.type === 'STAFF') return parsed.id;
      }
    }
    return 'shan-01';
  });
  const [commStaffId, setCommStaffId] = useState('shan-01');
  const [commInput, setCommInput] = useState('');
  const [bonusInput, setBonusInput] = useState('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [applyCategory, setApplyCategory] = useState('AL'); // Staff Leave Form state
  // === NEW STATE: half day duration toggle & SL sub-type ===
  const [applyDuration, setApplyDuration] = useState('1');
  const [slType, setSlType] = useState('immediate');

  // Modal States
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [viewPayslipData, setViewPayslipData] = useState(null);
  const [viewLeaveHistory, setViewLeaveHistory] = useState(null);
  const [waivePromptData, setWaivePromptData] = useState(null);
  const [rejectPromptId, setRejectPromptId] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [cancelPromptApp, setCancelPromptApp] = useState(null);
  // === NEW MODAL STATE ===
  const [probationPromptStaff, setProbationPromptStaff] = useState(null);
  const [approveWithExtra, setApproveWithExtra] = useState(null);

  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [newStaffForm, setNewStaffForm] = useState({
    username: '',
    password: '',
  });
  const [editForm, setEditForm] = useState({});
  const [newDesigInput, setNewDesigInput] = useState('');
  const [newJohorPHForm, setNewJohorPHForm] = useState({ name: '', date: '' }); 

  // --- FIREBASE SYNC ---
  useEffect(() => {
    const initAuth = async () => {
      if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        await signInWithCustomToken(auth, __initial_auth_token);
      } else {
        await signInAnonymously(auth);
      }
    };
    initAuth();
    const unsubAuth = onAuthStateChanged(auth, setFbUser);
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!fbUser) return;

    const staffRef = collection(db, 'artifacts', appId, 'public', 'data', 'staff');
    const unsubStaff = onSnapshot(staffRef, (snap) => {
        const list = snap.docs.map((d) => ({ ...d.data(), id: d.id }));
        if (list.length === 0) {
          const initial = {
            id: 'shan-01',
            username: 'testing',
            password: 'testing',
            name: 'Testing',
            phone: '+60 12-927 4000',
            gender: 'Female',
            role: 'Sales Personal Assistant',
            salary: 2200.0,
            ic: '030613-01-1448',
            epfNo: '24165688',
            taxNo: 'SG123456789',
            socsoNo: '030613011448',
            joinDate: '2025-03-25',
            probationEndDate: '',
            alWaivedProbation: false,
            tenureMonths: 12,
            alUsed: 0,
            mcUsed: 0,
            uplUsed: 0,
            phUsed: 0,
            rlUsed: 0,
            rlEarned: 0,
            slUsed: 0, // NEW
            selectedPHs: [],
            convertedPHs: [],
            company: 'AG Health Enterprise',
            status: 'active', // NEW: active / resigned
            confirmed: false, // NEW: probation confirmed flag
          };
          setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'staff', initial.id), initial);
        }
        setStaffList(list);
      },
      (err) => console.error('Staff sync failed', err)
    );

    const leaveRef = collection(db, 'artifacts', appId, 'public', 'data', 'leaveApps');
    const unsubLeaves = onSnapshot(leaveRef, (snap) => {
        setLeaveApps(snap.docs.map((d) => ({ ...d.data(), id: d.id })));
      },
      (err) => console.error('Leaves sync failed', err)
    );

    const payslipRef = collection(db, 'artifacts', appId, 'public', 'data', 'payslips');
    const unsubPayslips = onSnapshot(payslipRef, (snap) => {
        setPayslips(snap.docs.map((d) => ({ ...d.data(), id: d.id })));
      },
      (err) => console.error('Payslips sync failed', err)
    );

    const designationsRef = collection(db, 'artifacts', appId, 'public', 'data', 'designations');
    const unsubDesig = onSnapshot(designationsRef, (snap) => {
      const list = snap.docs.map((d) => ({ ...d.data(), id: d.id }));
      if (list.length === 0) {
        const initialList = [
          'Sales Personal Assistant', 'Sales Staff', 'Senior Sales Staff',
          'Sales Staff Manager', 'Video Editor', 'Accountant', 'Marketer',
        ];
        initialList.forEach((name) => addDoc(designationsRef, { name }));
      }
      setDesignations(list);
    });

    // JOHOR PH INIT & SYNC
    const unsubJohorPHs = onSnapshot(doc(db, 'artifacts', appId, 'public', 'data', 'settings', 'johorPHs'), (snap) => {
      if (snap.exists()) {
        setJohorPHs(snap.data().list || []);
      } else {
        const initial = [
          { id: 'jph-1', name: 'Thaipusam', date: '2026-02-02' },
          { id: 'jph-2', name: 'Chinese New Year Eve', date: '2026-02-16' },
          { id: 'jph-3', name: 'Chinese New Year', date: '2026-02-17' },
          { id: 'jph-4', name: 'Chinese New Year 2nd Day', date: '2026-02-18' },
          { id: 'jph-5', name: 'Awal Ramadan', date: '2026-02-19' },
          { id: 'jph-6', name: "Sultan of Johor's Birthday", date: '2026-03-23' },
          { id: 'jph-7', name: 'Labour Day', date: '2026-05-01' },
          { id: 'jph-8', name: "Agong's Birthday", date: '2026-06-01' },
          { id: 'jph-9', name: 'Hari Hol of Sultan Iskandar', date: '2026-07-21' },
          { id: 'jph-10', name: 'National Day', date: '2026-08-31' },
          { id: 'jph-11', name: 'Malaysia Day', date: '2026-09-16' },
          { id: 'jph-12', name: 'Christmas Day', date: '2026-12-25' },
        ];
        setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'settings', 'johorPHs'), { list: initial });
        setJohorPHs(initial);
      }
    });

    const companyRef = doc(db, 'artifacts', appId, 'public', 'data', 'companyInfo', 'main');
    const unsubCompany = onSnapshot(companyRef, (docSnap) => {
      if (docSnap.exists()) {
        setCompanyInfo(docSnap.data());
      } else {
        setDoc(companyRef, { name: 'AG Health Enterprise', ssm: '', tax: '' });
      }
    });

    return () => {
      unsubStaff(); unsubLeaves(); unsubPayslips(); unsubDesig(); unsubCompany(); unsubJohorPHs();
    };
  }, [fbUser]);

  // --- DERIVED DATA ---
  const activeStaff = useMemo(
    () => staffList.find((s) => s.id === selectedStaffId) || staffList[0] || {},
    [staffList, selectedStaffId]
  );

  // === NEW: working days in selected payroll month, for daily rate / UPL deduction ===
  const payrollMonthWorkDays = useMemo(() => {
    const mIdx = MONTHS.indexOf(selectedMonth);
    const yr = parseInt(selectedYear);
    return getWorkingDaysInMonth(yr, mIdx);
  }, [selectedMonth, selectedYear]);

  const hasSalary = Number(activeStaff?.salary) > 0;
  // === MODIFIED: DAILY_RATE now divides by actual working days in selected month, not flat 22 ===
  const DAILY_RATE = useMemo(
    () => (hasSalary ? (Number(activeStaff.salary) / payrollMonthWorkDays).toFixed(2) : '0.00'),
    [activeStaff, hasSalary, payrollMonthWorkDays]
  );

  const currentTenureMonths = activeStaff?.joinDate
    ? getMonthsDiff(activeStaff.joinDate, TODAY)
    : activeStaff?.tenureMonths || 0;

  // === NEW: completed months (used for accurate AL accrual) ===
  const completedMonths = useMemo(() => getCompletedMonths(activeStaff?.joinDate, TODAY), [activeStaff]);

  const getStaffYTD = (staffId) => {
    const sPayslips = payslips.filter((p) => p.staffId === staffId);
    if (sPayslips.length > 0) {
      return sPayslips.reduce(
        (acc, p) => ({
          netPay: acc.netPay + p.netTotal,
          eis: acc.eis + p.empEis,
          epf: acc.epf + p.empEpf,
          socso: acc.socso + p.empSocso,
          basic: acc.basic + p.basic,
          comm: acc.comm + p.comm,
        }),
        { netPay: 0, eis: 0, epf: 0, socso: 0, basic: 0, comm: 0 }
      );
    }
    const staff = staffList.find((s) => s.id === staffId);
    if (!staff || Number(staff?.salary) === 0)
      return { netPay: 0, eis: 0, epf: 0, socso: 0, basic: 0, comm: 0 };

    const m = staff?.joinDate ? getMonthsDiff(staff.joinDate, TODAY) : (Number(staff?.tenureMonths) || 1);
    const salary = Number(staff?.salary) || 0;

    // Pro-rate first month if joined mid-month
    let firstMonthBasic = salary;
    const join = staff?.joinDate ? new Date(staff.joinDate) : null;
    if (join) {
      const joinMonth = join.getMonth();
      const joinYear = join.getFullYear();
      const workDaysInJoinMonth = getWorkingDaysInMonth(joinYear, joinMonth);
      const actualDays = getProRatedWorkDays(staff.joinDate, joinYear, joinMonth);
      if (actualDays < workDaysInJoinMonth) {
        firstMonthBasic = Math.round((salary / workDaysInJoinMonth) * actualDays * 100) / 100;
      }
    }

    const fullMonths = Math.max(0, m - 1);
    const estimatedTotal = firstMonthBasic + (salary * fullMonths);

    return {
      netPay: estimatedTotal - (257.05 * m),
      eis: 4.3 * m,
      epf: Math.round(salary * 0.11 * m * 100) / 100,
      socso: 10.75 * m,
      basic: estimatedTotal,
      comm: 0,
    };
  };

  const careerTotals = useMemo(
    () => getStaffYTD(activeStaff?.id),
    [activeStaff, payslips]
  );

  // === MODIFIED: calculatedUPL now also matches year, not just month name ===
  const calculatedUPL = useMemo(() => {
    const mIdx = MONTHS.indexOf(selectedMonth);
    const yr = parseInt(selectedYear);
    return leaveApps
      .filter(
        (app) =>
          app.staffId === commStaffId &&
          app.type === 'UPL' &&
          app.status === 'APPROVED'
      )
      .reduce((sum, app) => {
        const appDate = new Date(app.startDate);
        return (appDate.getMonth() === mIdx && appDate.getFullYear() === yr) ? sum + app.days : sum;
      }, 0);
  }, [leaveApps, commStaffId, selectedMonth, selectedYear]);

  // === AL ACCRUAL: by default (alWaivedProbation=false) counts from Day 1.
  // If alWaivedProbation=true, counts only from day after probation ends (confirmDate). ===
  const rawAccruedAL = useMemo(() => {
    if (!activeStaff.id) return 0;

    let accrualStartDate = activeStaff.joinDate;

    if (activeStaff?.alWaivedProbation && activeStaff?.probationEndDate) {
      const probEnd = new Date(activeStaff.probationEndDate);
      if (TODAY <= probEnd) return 0;
      const confirmStart = new Date(probEnd);
      confirmStart.setDate(confirmStart.getDate() + 1);
      accrualStartDate = confirmStart.toISOString().split('T')[0];
    }

    const monthsAccrued = getCompletedMonths(accrualStartDate, TODAY);

    let monthlyRate = 8 / 12;
    if (currentTenureMonths >= 60) monthlyRate = 16 / 12;
    else if (currentTenureMonths >= 24) monthlyRate = 12 / 12;

    return monthsAccrued * monthlyRate;
  }, [activeStaff, currentTenureMonths, completedMonths]);

  // earnedAL kept for backward compatibility with existing JSX (rounded display value)
  const earnedAL = useMemo(() => {
    return Math.max(0, Math.ceil(rawAccruedAL));
  }, [rawAccruedAL]);

  // === NEW: can staff actually apply AL (must have accrued >= 1 full day) ===
  const canApplyAL = rawAccruedAL >= 1;

  const groupedActionLogs = useMemo(() => {
    const logs = leaveApps.filter((a) => a.staffId === activeStaff.id);
    const groups = {};
    logs.forEach((log) => {
      const dateKey = new Date(log.appliedAt || Date.now()).toLocaleDateString(
        'en-GB',
        { day: '2-digit', month: 'long', year: 'numeric' }
      );
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(log);
    });
    return groups;
  }, [leaveApps, activeStaff.id]);

  // === NEW: probation notifications (admin gets notified when staff's probation ends) ===
  const probationNotifications = useMemo(() => {
    return staffList.filter(s => {
      if (!s.probationEndDate || s.confirmed) return false;
      return isProbationEndingSoon(s.probationEndDate);
    });
  }, [staffList]);

  // === NEW: sort staff so Active appear first, Resigned appear last (greyed/strikethrough) ===
  const sortedStaffList = useMemo(() => {
    const activeOnes = staffList.filter(s => s.status !== 'resigned')
      .sort((a, b) => (a.name || a.username || '').localeCompare(b.name || b.username || ''));
    const resignedOnes = staffList.filter(s => s.status === 'resigned')
      .sort((a, b) => (a.name || a.username || '').localeCompare(b.name || b.username || ''));
    return [...activeOnes, ...resignedOnes];
  }, [staffList]);

  // --- PERSISTENCE WRAPPERS ---
  const updateStaffData = async (sid, data) => {
    await setDoc(
      doc(db, 'artifacts', appId, 'public', 'data', 'staff', sid),
      data,
      { merge: true }
    );
  };

  const addLeaveApp = async (app) => {
    const id = 'leave-' + Date.now();
    await setDoc(
      doc(db, 'artifacts', appId, 'public', 'data', 'leaveApps', id),
      { ...app, id, appliedAt: Date.now() }
    );
    triggerAlert(t('Application Submitted / 已提交申请'));
  };

  const updateLeaveApp = async (id, data) => {
    await updateDoc(
      doc(db, 'artifacts', appId, 'public', 'data', 'leaveApps', id),
      data
    );
  };

  // --- CORE FUNCTIONS ---
  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) =>
        updateStaffData(activeStaff.id, { profilePic: ev.target.result });
      reader.readAsDataURL(file);
    }
  };

  const openEditModal = () => {
    setEditForm({ ...activeStaff });
    setIsAdminUnlocked(currentUser.type === 'ADMIN');
    setIsEditProfileModalOpen(true);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (currentUser.type === 'ADMIN') {
      const oldStaff = staffList.find((s) => s.id === editForm.id);
      let finalEditForm = { ...editForm };

      // === NEW: auto-calc probation end date if join date set and prob date empty ===
      if (finalEditForm.joinDate && !finalEditForm.probationEndDate) {
        finalEditForm.probationEndDate = calcProbationEnd(finalEditForm.joinDate);
      }
      
      if (
        (!oldStaff.probationEndDate || oldStaff.probationEndDate === '') &&
        editForm.probationEndDate
      ) {
        setIsEditProfileModalOpen(false); 
        return setWaivePromptData({ editForm: finalEditForm });
      }
      
      await updateStaffData(editForm.id, finalEditForm);
      setIsEditProfileModalOpen(false); 
      triggerAlert(t('Record Updated Successfully.')); 
    } else {
      await addLeaveApp({
        staffId: activeStaff.id,
        username: activeStaff.username,
        staffName: activeStaff.name,
        type: 'PROFILE_UPDATE',
        data: editForm,
        days: 0,
        status: 'PENDING',
        appliedAt: Date.now(),
        timestamp: new Date().toLocaleString(),
        actionAt: null,
      });
      setIsEditProfileModalOpen(false); 
      triggerAlert(t('Update Submitted for Admin Approval.')); 
    }
  };

  const confirmWaive = async (waive) => {
    const finalEditForm = {
      ...waivePromptData.editForm,
      alWaivedProbation: waive,
    };
    await updateStaffData(finalEditForm.id, finalEditForm);
    if (!waive && finalEditForm.joinDate && finalEditForm.probationEndDate) {
      const probMonths = getMonthsDiff(
        finalEditForm.joinDate,
        finalEditForm.probationEndDate
      );
      await addLeaveApp({
        staffId: finalEditForm.id,
        username: finalEditForm.username,
        staffName: finalEditForm.name || finalEditForm.username,
        type: 'SYSTEM_AL_PROBATION',
        days: Math.max(0, Math.floor(probMonths * 0.5)),
        status: 'APPROVED',
        appliedAt: Date.now(),
        timestamp: new Date().toLocaleString(),
        actionAt: new Date().toLocaleString(),
      });
    }
    setWaivePromptData(null);
    triggerAlert(t('Record Updated Successfully.'));
  };

  // === MODIFIED processLeave: now supports markAsExtra (Admin Special Request override -> no deduction) ===
  const processLeave = async (id, status, reason = '', markAsExtra = false) => {
    const actionTime = new Date().toLocaleString();
    const app = leaveApps.find((a) => a.id === id);
    if (!app) return;

    const finalType = markAsExtra ? 'EXTRA' : app.type;
    await updateLeaveApp(id, {
      status,
      actionAt: actionTime,
      rejectReason: reason,
      finalType, // NEW field to track if it was approved as Extra Leave
    });
    if (status === 'APPROVED') {
      const s = staffList.find((s) => s.id === app.staffId);
      let updates = {};
      if (app.type === 'PROFILE_UPDATE') {
        updates = app.data;
      } else if (app.type === 'HOLIDAY_SWAP') {
        updates = { rlEarned: (s.rlEarned || 0) + 1 };
      } else if (markAsExtra) {
        // NEW: Extra Leave -> no balance deduction, no pay deduction
        updates = {};
      } else {
        const typeKey =
          app.type === 'AL'
            ? 'alUsed'
            : app.type === 'MC'
            ? 'mcUsed'
            : app.type === 'RL'
            ? 'rlUsed'
            : app.type === 'SL' // NEW
            ? 'slUsed'
            : 'uplUsed';
        updates = { [typeKey]: (s[typeKey] || 0) + app.days };
      }
      await updateStaffData(app.staffId, updates);
    }
  };

  const handleConfirmAddStaff = async (e) => {
    e.preventDefault();
    if (!newStaffForm.username || !newStaffForm.password) return;
    const newId = 'staff-' + Date.now();
    const joinDate = TODAY.toISOString().split('T')[0];
    const probEnd = calcProbationEnd(joinDate); // NEW: auto-calc 3-month probation
    const newStaff = {
      id: newId,
      username: newStaffForm.username,
      password: newStaffForm.password,
      name: '',
      phone: '',
      gender: 'Male',
      role: 'Sales Staff',
      salary: 0,
      ic: '',
      epfNo: '',
      taxNo: '',
      socsoNo: '',
      joinDate,
      probationEndDate: probEnd, // NEW: auto-filled
      alWaivedProbation: false,
      tenureMonths: 0,
      alUsed: 0,
      mcUsed: 0,
      uplUsed: 0,
      phUsed: 0,
      rlUsed: 0,
      rlEarned: 0,
      slUsed: 0, // NEW
      selectedPHs: [],
      convertedPHs: [],
      company: companyInfo.name,
      status: 'active', // NEW
      confirmed: false, // NEW
    };
    await setDoc(
      doc(db, 'artifacts', appId, 'public', 'data', 'staff', newId),
      newStaff
    );
    setSelectedStaffId(newId);
    setCommStaffId(newId);
    setNewStaffForm({ username: '', password: '' });
    setIsAddStaffModalOpen(false);
    triggerAlert(t('Staff account created.') + ` Probation ends: ${probEnd}`);
  };

  // === MODIFIED generatePayslip: pro-rates first-month basic salary by actual working days, daily rate uses actual month working days ===
  const generatePayslip = async () => {
    const target = staffList.find((s) => s.id === commStaffId);
    if (!target) return triggerAlert(t('Select staff member.'));
    const basic = Number(target.salary),
      comm = parseFloat(commInput) || 0,
      bonus = parseFloat(bonusInput) || 0;

    const mIdx = MONTHS.indexOf(selectedMonth);
    const yr = parseInt(selectedYear);
    const workDaysInMonth = getWorkingDaysInMonth(yr, mIdx);

    // NEW: pro-rate basic salary if this is the staff's joining month
    let proRatedBasic = basic;
    const join = target.joinDate ? new Date(target.joinDate) : null;
    if (join && join.getFullYear() === yr && join.getMonth() === mIdx) {
      const actualDays = getProRatedWorkDays(target.joinDate, yr, mIdx);
      proRatedBasic = Math.round((basic / workDaysInMonth) * actualDays * 100) / 100;
    }

    const dailyRate = basic / workDaysInMonth; // NEW: based on actual working days, not flat 22
    const uplDeduction = calculatedUPL * dailyRate;
    const empEpf = Math.round(proRatedBasic * 0.11 * 100) / 100; // NEW: EPF calculated off pro-rated basic
    const empSocso = 10.75, empEis = 4.3;
    const totalDeductions = empEpf + empSocso + empEis + uplDeduction;
    const netTotal = proRatedBasic + comm + bonus - totalDeductions;
    const employerEpf = Math.round(proRatedBasic * 0.13 * 100) / 100;

    const id = 'slip-' + Date.now();
    await setDoc(
      doc(db, 'artifacts', appId, 'public', 'data', 'payslips', id),
      {
        id,
        staffId: target.id,
        month: selectedMonth,
        year: Number(selectedYear),
        basic: proRatedBasic, // NEW: pro-rated if joining month
        originalBasic: basic, // NEW: keep original for reference
        comm,
        bonus,
        uplDays: calculatedUPL,
        dailyRate,
        uplDeduction,
        empEpf,
        empSocso,
        empEis,
        tax: 0,
        totalEarnings: proRatedBasic + comm + bonus,
        totalDeductions,
        netTotal,
        employerEpf,
        employerSocso: 37.65,
        employerEis: 4.3,
        workDaysInMonth, // NEW: stored for reference
      }
    );
    setCommInput('');
    setBonusInput('');
    setSelectedStaffId(target.id);
  };

  const deletePayslipRecord = async (id) => {
    await deleteDoc(
      doc(db, 'artifacts', appId, 'public', 'data', 'payslips', id)
    );
    triggerAlert(t('Record Deleted.'));
  };

  const handleDownloadPayslip = async (payslip, staff) => {
    setIsGeneratingPdf(true);
    if (typeof window !== 'undefined' && !window.html2pdf) {
      await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src =
          'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = resolve;
        document.head.appendChild(script);
      });
    }
    const ytd = getStaffYTD(staff.id);
    const element = document.createElement('div');
    
    // FORCE SINGLE PAGE: Absolute height lock & precise spacing to prevent PDF break
    element.innerHTML = `
      <div style="width: 210mm; height: 285mm; max-height: 285mm; padding: 12mm 15mm; font-family: Helvetica, Arial, sans-serif; color: #1e293b; background: white; box-sizing: border-box; overflow: hidden; display: flex; flex-direction: column;">
        
        <div style="border-bottom: 2px solid #4f46e5; padding-bottom: 6px; margin-bottom: 10px;">
          <h1 style="margin: 0; color: #4f46e5; text-transform: uppercase; font-size: 24px; font-weight: 900; letter-spacing: 0.5px;">${
            staff.company
          }</h1>
          <p style="margin: 2px 0; font-size: 9px; color: #64748b;">(Registration No. ${
            companyInfo.ssm
          })</p>
          <p style="margin: 6px 0 0; font-weight: 800; color: #1e293b; font-size: 13px; letter-spacing: 0.5px;">OFFICIAL PAYSLIP - ${
            t(payslip.month).toUpperCase()
          } ${payslip.year}</p>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 11px; line-height: 1.5; letter-spacing: 0.2px;">
          <div>
            <p style="margin: 2px 0"><strong>Employee:</strong> ${staff.name || staff.username}</p>
            <p style="margin: 2px 0"><strong>Position:</strong> ${t(staff.role)}</p>
            <p style="margin: 2px 0"><strong>ID:</strong> ${staff.username}</p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 2px 0"><strong>IC No:</strong> ${staff.ic || '-'}</p>
            <p style="margin: 2px 0"><strong>EPF No:</strong> ${staff.epfNo || '-'}</p>
            <p style="margin: 2px 0"><strong>SOCSO No:</strong> ${staff.socsoNo || '-'}</p>
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px; font-size: 11px; letter-spacing: 0.2px;">
          <thead><tr style="background: #f1f5f9; text-align: left;"><th style="padding: 6px 8px; border-bottom: 2px solid #e2e8f0; font-weight: 800;">EARNINGS</th><th style="padding: 6px 8px; border-bottom: 2px solid #e2e8f0; text-align: right; font-weight: 800;">AMOUNT (RM)</th></tr></thead>
          <tbody>
            <tr><td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9;">Basic Salary${payslip.basic !== payslip.originalBasic ? ' (Pro-rated)' : ''}</td><td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9; text-align: right;">${payslip.basic.toFixed(2)}</td></tr>
            <tr><td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9;">Commission</td><td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9; text-align: right;">${payslip.comm.toFixed(2)}</td></tr>
            <tr><td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9;">Bonus</td><td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9; text-align: right;">${payslip.bonus.toFixed(2)}</td></tr>
          </tbody>
        </table>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px; font-size: 11px; letter-spacing: 0.2px;">
          <thead><tr style="background: #f1f5f9; text-align: left;"><th style="padding: 6px 8px; border-bottom: 2px solid #e2e8f0; font-weight: 800;">EMPLOYEE DEDUCTIONS</th><th style="padding: 6px 8px; border-bottom: 2px solid #e2e8f0; text-align: right; font-weight: 800;">AMOUNT (RM)</th></tr></thead>
          <tbody style="color: #ef4444;">
            <tr><td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9;">Unpaid Leave (${payslip.uplDays} days × RM${(payslip.dailyRate||0).toFixed(2)}/day)</td><td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold;">-${payslip.uplDeduction.toFixed(2)}</td></tr>
            <tr><td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9;">EPF (11%)</td><td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold;">-${(payslip.empEpf||242).toFixed(2)}</td></tr>
            <tr><td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9;">SOCSO</td><td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold;">-10.75</td></tr>
            <tr><td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9;">EIS</td><td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold;">-4.30</td></tr>
          </tbody>
        </table>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px; font-size: 11px; letter-spacing: 0.2px;">
          <thead><tr style="background: #f8fafc; text-align: left; color: #059669;"><th style="padding: 6px 8px; border-bottom: 2px solid #e2e8f0; font-weight: 800;">EMPLOYER CONTRIBUTIONS (For Info)</th><th style="padding: 6px 8px; border-bottom: 2px solid #e2e8f0; text-align: right; font-weight: 800;">AMOUNT (RM)</th></tr></thead>
          <tbody>
            <tr><td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">EPF (13%)</td><td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold;">${payslip.employerEpf.toFixed(2)}</td></tr>
            <tr><td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">SOCSO</td><td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold;">${payslip.employerSocso.toFixed(2)}</td></tr>
            <tr><td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">EIS</td><td style="padding: 6px 8px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold;">${payslip.employerEis.toFixed(2)}</td></tr>
          </tbody>
        </table>
        
        <!-- NETT PAY CARD WITH ROUNDED CORNERS -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #4f46e5; color: white; padding: 12px 18px; border-radius: 12px; margin-top: 10px; font-size: 15px; font-weight: 900; letter-spacing: 0.5px;">
          <span>NETT PAY</span>
          <span>RM ${payslip.netTotal.toFixed(2)}</span>
        </div>

        <!-- EXPLICIT GAP TO PREVENT CLASHING -->
        <div style="height: 15px; flex-shrink: 0;"></div>

        <!-- CAREER TRACKER CARD WITH ROUNDED CORNERS -->
        <div style="background: #0f172a; color: white; padding: 16px; border-radius: 12px; letter-spacing: 0.2px;">
          <h4 style="margin: 0 0 10px 0; color: #818cf8; font-size: 10px; text-transform: uppercase;">Career Tracker (Since Joined)</h4>
          <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: bold;">
             <div><span style="color: #94a3b8; display: block; font-size: 8px; margin-bottom: 4px;">TOTAL BASIC</span>RM ${ytd.basic.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
             <div><span style="color: #94a3b8; display: block; font-size: 8px; margin-bottom: 4px;">TOTAL COMM</span><span style="color: #34d399;">RM ${ytd.comm.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
             <div><span style="color: #94a3b8; display: block; font-size: 8px; margin-bottom: 4px;">TOTAL EPF</span><span style="color: #a5b4fc;">RM ${ytd.epf.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
          </div>
        </div>

        <!-- PUSH FOOTER TO THE ABSOLUTE BOTTOM -->
        <div style="margin-top: auto; font-size: 8px; text-align: center; color: #94a3b8; border-top: 1px dashed #e2e8f0; padding-top: 8px; letter-spacing: 0.2px;">
          This is a computer-generated payslip. No signature is required. Tax No: ${companyInfo.tax}
        </div>

      </div>
    `;
    const opt = {
      margin: 0,
      filename: `Payslip_${staff.username}_${payslip.month}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: 'avoid-all' }
    };
    window
      .html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => setIsGeneratingPdf(false));
  };

  const updateCompanyInfo = async (data) => {
    const companyRef = doc(
      db,
      'artifacts',
      appId,
      'public',
      'data',
      'companyInfo',
      'main'
    );
    await setDoc(companyRef, data, { merge: true });
    triggerAlert(t('Company Info Updated.'));
  };

  const addDesignation = async () => {
    if (!newDesigInput) return;
    const designationsRef = collection(
      db,
      'artifacts',
      appId,
      'public',
      'data',
      'designations'
    );
    await addDoc(designationsRef, { name: newDesigInput });
    setNewDesigInput('');
  };

  const deleteDesignation = async (id) => {
    const designationsRef = doc(
      db,
      'artifacts',
      appId,
      'public',
      'data',
      'designations',
      id
    );
    await deleteDoc(designationsRef);
  };

  // === NEW: confirm employment / extend probation handler ===
  const handleConfirmEmployment = async (staffId, extend = false) => {
    const staff = staffList.find(s => s.id === staffId);
    if (!staff) return;
    if (extend) {
      const newProbEnd = calcProbationEnd(staff.probationEndDate);
      await updateStaffData(staffId, { probationEndDate: newProbEnd, confirmed: false });
      triggerAlert(`Probation extended until ${newProbEnd}`);
    } else {
      await updateStaffData(staffId, { confirmed: true, confirmDate: TODAY.toISOString().split('T')[0] });
      triggerAlert(`${staff.name || staff.username} confirmed as permanent employee!`);
    }
    setProbationPromptStaff(null);
  };

  // === NEW: half-day-aware leave submission for staff (extends existing submit button logic, used inline in JSX too) ===
  const handleSubmitLeaveWithHalfDay = () => {
    const type = document.getElementById('lType').value;

    if (type === 'HOLIDAY_SWAP') {
      const swapDate = document.getElementById('lSwapDate').value;
      if (!swapDate) return triggerAlert(t('Dates are required.'));
      const selectedPh = johorPHs.find(p => p.date === swapDate);
      addLeaveApp({
        staffId: currentUser.id,
        username: currentUser.username,
        staffName: currentUser.name,
        type: 'HOLIDAY_SWAP',
        startDate: swapDate,
        endDate: swapDate,
        days: 1,
        holidayName: selectedPh?.name || 'Public Holiday',
        status: 'PENDING',
        timestamp: new Date().toLocaleString(),
        actionAt: null,
      });
      return;
    }

    if (type === 'SL') {
      const start = document.getElementById('lStart').value;
      if (!start) return triggerAlert(t('Dates are required.'));
      const slDays = slType === 'immediate' ? 3 : 1;
      addLeaveApp({
        staffId: currentUser.id,
        username: currentUser.username,
        staffName: currentUser.name,
        type: 'SL',
        startDate: start,
        endDate: start,
        days: slDays,
        slType,
        status: 'PENDING',
        timestamp: new Date().toLocaleString(),
        actionAt: null,
      });
      return;
    }

    const start = document.getElementById('lStart').value;
    const end = document.getElementById('lEnd').value;
    if (!start || !end) return triggerAlert(t('Dates are required.'));

    if (type === 'AL' && !canApplyAL) {
      triggerAlert('Annual Leave not yet accrued to 1 full day. This request will be treated as Unpaid Leave unless Admin grants Extra Leave approval.');
    }

    const duration = parseFloat(applyDuration);
    let days;
    if (duration === 0.5) {
      days = 0.5;
    } else {
      days = Math.ceil(Math.abs(new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)) + 1;
    }

    addLeaveApp({
      staffId: currentUser.id,
      username: currentUser.username,
      staffName: currentUser.name,
      type,
      startDate: start,
      endDate: duration === 0.5 ? start : end,
      days,
      duration,
      isHalfDay: duration === 0.5,
      status: 'PENDING',
      timestamp: new Date().toLocaleString(),
      actionAt: null,
    });
  };

  // LOGOUT (Clear Persistence)
  const handleLogout = () => {
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hr_app_user');
    }
    setLoginForm({ user: '', pass: '' });
    setHrSubTab('PROFILE');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const admin = ADMIN_CREDENTIALS.find(
      (u) => u.user === loginForm.user && u.pass === loginForm.pass
    );
    // === MODIFIED: staff can login with username OR legalName(name) if no username is set ===
    const staff = staffList.find(
      (u) => {
        const matchUsername = u.username && u.username === loginForm.user && u.password === loginForm.pass;
        const matchLegalName = !u.username && u.name && u.name.toLowerCase() === loginForm.user.toLowerCase() && u.password === loginForm.pass;
        return matchUsername || matchLegalName;
      }
    );
    if (admin) {
      const userObj = { ...admin };
      setCurrentUser(userObj);
      if (typeof window !== 'undefined') {
        localStorage.setItem('hr_app_user', JSON.stringify(userObj));
      }
      setHrSubTab('PROFILE');
      setLoginError('');
    } else if (staff) {
      const userObj = {
        ...staff,
        type: 'STAFF',
        user: staff.username || staff.name,
        pass: staff.password,
      };
      setCurrentUser(userObj);
      if (typeof window !== 'undefined') {
        localStorage.setItem('hr_app_user', JSON.stringify(userObj));
      }
      setSelectedStaffId(staff.id);
      setHrSubTab('PROFILE');
      setLoginError('');
    } else setLoginError('Invalid Username or Password.');
  };

  const EmptyStaffState = () => (
    <div className="flex flex-col items-center justify-center py-32 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm mt-6">
      <UserCircle size={64} className="text-slate-200 mb-4" />
      <p className="text-slate-500 font-bold uppercase text-sm">{t('No Staff Record Found')}</p>
      <p className="text-slate-400 text-xs mt-2">{t('Please click "CREATE STAFF" to initialize the database.')}</p>
    </div>
  );

  if (!currentUser) {
    return (
      <>
        <style>{globalCss}</style>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans p-6 w-full">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-10 border border-slate-200">
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-indigo-100">
                <ShieldCheck size={28} />
              </div>
              <h1 className="text-xl font-bold text-slate-900 leading-none tracking-tight">
                {t('HR Pro')}
              </h1>
              <p className="text-slate-400 text-[10px] font-semibold uppercase mt-2 border-b border-indigo-100 pb-1">
                {t('Management Portal')}
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-indigo-600 font-medium text-sm text-slate-900 transition-all"
                placeholder={t('Username')}
                value={loginForm.user}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, user: e.target.value })
                }
                required
              />
              <input
                type="password"
                name="password"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-indigo-600 font-medium text-sm text-slate-900 transition-all"
                placeholder={t('Password')}
                value={loginForm.pass}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, pass: e.target.value })
                }
                required
              />
              {loginError && (
                <p className="text-red-500 text-[10px] font-bold text-center uppercase bg-red-50 py-2 rounded-lg">
                  {loginError}
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-lg shadow-lg hover:bg-indigo-700 transition active:scale-95 text-xs uppercase"
              >
                {t('Sign In')}
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  // === NEW: confirmed employment check helper for header badge ===
  const isConfirmed = activeStaff?.confirmed || (activeStaff?.probationEndDate && new Date(activeStaff.probationEndDate) < TODAY);

  return (
    <>
      <style>{globalCss}</style>
      <div className={`min-h-screen w-full ${isDark ? 'dark-theme' : ''} bg-slate-50 font-sans text-slate-800 pb-20 leading-normal transition-colors duration-200`}>
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm transition-colors duration-200">
          <div className="flex items-center gap-3">
            <Building className="text-indigo-600" size={20} />
            <h1 className="text-lg font-bold uppercase leading-none tracking-tight text-slate-900">
              {currentUser.company}
            </h1>
            <span className="bg-indigo-50 text-indigo-600 text-[8px] px-2 py-0.5 rounded font-bold uppercase">
              {currentUser.type}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/* === NEW: Probation notification bell (Admin only) === */}
            {currentUser.type === 'ADMIN' && probationNotifications.length > 0 && (
              <button
                onClick={() => setProbationPromptStaff(probationNotifications[0])}
                className="relative p-1.5 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 probation-badge"
                title="Probation ending notifications"
              >
                <Bell size={16} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[8px] rounded-full flex items-center justify-center font-bold">
                  {probationNotifications.length}
                </span>
              </button>
            )}
            <button onClick={() => setLang(lang === 'en' ? 'zh' : 'en')} className="p-1.5 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition" title="Toggle Language">
              <Globe size={16} />
            </button>
            <button onClick={() => setIsDark(!isDark)} className="p-1.5 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition" title="Toggle Dark Mode">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="w-px h-5 bg-slate-300 mx-2" />
            <p className="text-sm font-bold text-slate-900">{currentUser.user}</p>
            <button
              onClick={handleLogout}
              className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition shadow-sm"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        <div className="w-full px-4 md:px-8 py-6 space-y-6">
          <div className="flex gap-1 border-b">
            {[
              'PROFILE',
              'LEAVE_APPLICATION',
              'PAYROLL',
              ...(currentUser.type === 'ADMIN' ? ['ADMIN_PANEL'] : []),
            ].map((id) => (
              <button
                key={id}
                onClick={() => setHrSubTab(id)}
                className={`px-6 py-3 text-xs font-bold transition-all border-b-2 ${
                  hrSubTab === id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                {t(id.replace('_', ' '))}
              </button>
            ))}
          </div>

          {currentUser.type === 'ADMIN' && (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex items-center justify-between transition-colors duration-200">
              <div className="flex items-center gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase text-slate-400 block ml-1 text-left">
                    {t('Staff Access Selection')}
                  </label>
                  <select
                    className="block w-64 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold outline-none cursor-pointer focus:border-indigo-400 transition-colors duration-200"
                    value={selectedStaffId}
                    onChange={(e) => setSelectedStaffId(e.target.value)}
                  >
                    {/* === MODIFIED: use sortedStaffList so resigned staff appear last with strike-through styling === */}
                    {sortedStaffList.map((s) => (
                      <option
                        key={s.id}
                        value={s.id}
                        style={{
                          textDecoration: s.status === 'resigned' ? 'line-through' : 'none',
                          color: s.status === 'resigned' ? '#94a3b8' : 'inherit',
                        }}
                      >
                        {s.status === 'resigned' ? '— ' : ''}{s.name || s.username}{s.status === 'resigned' ? ' [Resigned]' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div className="text-[10px] font-bold text-slate-500 uppercase">
                  {t('Headcount:')} {staffList.filter(s => s.status !== 'resigned').length} {t('Active')}
                </div>
                {/* === NEW: resigned badge next to selector === */}
                {activeStaff?.status === 'resigned' && (
                  <span className="bg-slate-100 text-slate-500 text-[9px] px-2 py-1 rounded font-bold uppercase border line-through">
                    {t('Resigned')}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {/* === NEW: Active/Resigned toggle buttons === */}
                {activeStaff?.id && activeStaff?.status !== 'resigned' && (
                  <button
                    onClick={() => { if (window.confirm('Mark this staff as Resigned?')) updateStaffData(activeStaff.id, { status: 'resigned' }); }}
                    className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-rose-50 hover:text-rose-600 transition flex items-center gap-1"
                  >
                    <UserX size={14} /> {t('Resigned')}
                  </button>
                )}
                {activeStaff?.id && activeStaff?.status === 'resigned' && (
                  <button
                    onClick={() => updateStaffData(activeStaff.id, { status: 'active' })}
                    className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-100 transition flex items-center gap-1"
                  >
                    <UserCheck size={14} /> Re-activate
                  </button>
                )}
                <button
                  onClick={() => setIsAddStaffModalOpen(true)}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700 transition shadow-md flex items-center gap-2"
                >
                  <Plus size={14} /> {t('CREATE')}
                </button>
              </div>
            </div>
          )}

          <div className="min-h-[500px]">
            {hrSubTab === 'PROFILE' && (
              activeStaff.id ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row transition-colors duration-200">
                  <div className="md:w-48 bg-indigo-600 p-8 flex flex-col items-start md:items-center justify-center text-white relative">
                    <div className="w-24 h-24 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-3xl font-bold mb-3 shadow-inner relative overflow-hidden">
                      {activeStaff.profilePic ? (
                        <img
                          src={activeStaff.profilePic}
                          className="w-full h-full object-cover rounded-xl profile-pic-preserve"
                          alt="Profile"
                        />
                      ) : activeStaff.name ? (
                        activeStaff.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                      ) : (
                        '?'
                      )}
                      <label className="absolute -bottom-3 -right-3 bg-indigo-400 hover:bg-indigo-300 p-2 rounded-full cursor-pointer shadow-lg transition z-10 border-2 border-indigo-600">
                        <Plus size={16} className="text-white" />
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleProfilePicUpload}
                        />
                      </label>
                    </div>
                    <p className="text-[8px] font-bold uppercase tracking-wider text-indigo-200">
                      {t('Ref:')} {activeStaff.id}
                    </p>
                  </div>
                  <div className="flex-1 p-8 space-y-6 text-left">
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-6 gap-4 transition-colors duration-200">
                      <div className="text-left">
                        <div className="flex items-center gap-3">
                          <h2 className="text-xl font-bold text-slate-900">
                            {activeStaff.name || 'Unnamed Staff'}
                          </h2>
                          <button
                            onClick={openEditModal}
                            className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition shadow-sm"
                          >
                            <Edit3 size={16} />
                          </button>
                        </div>
                        <p className="text-slate-500 text-xs font-medium uppercase mt-1 text-left">
                          {activeStaff.probationEndDate &&
                          new Date(activeStaff.probationEndDate) < TODAY
                            ? t('Status: Confirmed Employment')
                            : t('Status: Probation Period')}
                        </p>
                        {/* === NEW: Manage Probation quick-link for Admin === */}
                        {currentUser.type === 'ADMIN' && !activeStaff.confirmed && activeStaff.probationEndDate && (
                          <button onClick={() => setProbationPromptStaff(activeStaff)} className="text-[9px] font-bold text-indigo-600 underline mt-1">
                            {t('Probation Ended')} - Manage
                          </button>
                        )}
                      </div>
                      <div className="text-left md:text-right">
                        <label className="text-[9px] font-bold uppercase text-slate-400 block mb-2">
                          {t('Designation')}
                        </label>
                        <div className="px-4 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-bold text-[10px] uppercase border transition-colors duration-200 inline-block">
                          {t(activeStaff.role)}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8 text-left">
                      {[
                        { label: t('Contact'), value: activeStaff.phone },
                        { label: t('IC Identity'), value: activeStaff.ic },
                        { label: t('Gender'), value: t(activeStaff.gender) },
                        { label: t('Join Date'), value: activeStaff.joinDate || 'Not Set' },
                        { label: t('Prob. End Date'), value: activeStaff.probationEndDate || 'Not Set' },
                        { label: 'Confirmed Date', value: (() => {
                          if (activeStaff.confirmDate) return activeStaff.confirmDate;
                          if (activeStaff.probationEndDate) {
                            const d = new Date(activeStaff.probationEndDate);
                            d.setDate(d.getDate() + 1);
                            return d.toISOString().split('T')[0];
                          }
                          return 'Not Set';
                        })() },
                        { label: t('SOCSO ID'), value: activeStaff.socsoNo },
                      ].map((item) => (
                        <div key={item.label} className="space-y-1 text-left">
                          <p className="text-[10px] font-semibold text-slate-500 uppercase text-left">
                            {item.label}
                          </p>
                          <p className="font-bold text-slate-800 text-sm text-left">
                            {String(item.value || 'N/A')}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="pt-6 border-t border-slate-100 flex items-center gap-8 transition-colors duration-200 text-left">
                      <div className="text-left">
                        <p className="text-xs font-semibold text-slate-500 uppercase mb-1 text-left">
                          {t('Monthly Basic')}
                        </p>
                        <p className="font-bold text-indigo-600 text-2xl text-left">
                          RM{' '}
                          {hasSalary
                            ? Number(activeStaff.salary).toFixed(2)
                            : '0.00'}
                        </p>
                      </div>
                      <div className="h-10 w-px bg-slate-200" />
                      <div className="text-left">
                        <p className="text-xs font-semibold text-slate-500 uppercase mb-1 text-left">
                          {t('Daily Rate')}
                        </p>
                        <p className="font-bold text-slate-800 text-lg text-left">
                          RM {DAILY_RATE}
                        </p>
                      </div>
                      <div className="h-10 w-px bg-slate-200" />
                      <div className="text-left">
                        <p className="text-xs font-semibold text-slate-500 uppercase mb-1 text-left">
                          AL Accrued
                        </p>
                        <p className="font-bold text-emerald-600 text-lg text-left">
                          {Math.max(0, earnedAL - (activeStaff.alUsed || 0)).toFixed(1)} Left
                        </p>
                        <p className="text-[10px] text-slate-400 font-semibold">
                          / {earnedAL.toFixed(1)} Total ({rawAccruedAL.toFixed(2)} accrued)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 3 equal cards: Employee Deduct | Employer Contrib | Career Tracker */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Card 1: Employee Deduct */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 hover:border-indigo-200 transition-colors duration-200 text-left">
                    <h3 className="text-sm font-bold text-indigo-500 uppercase border-b border-slate-200 pb-3">
                      {t('Employee Portion (Deduct)')}
                    </h3>
                    <div className="space-y-3 font-bold text-[11px] text-slate-600">
                      <div className="flex justify-between"><span>{t('EPF (11%)')}</span><span>RM {hasSalary ? (Number(activeStaff.salary)*0.11).toFixed(2) : '0.00'}</span></div>
                      <div className="flex justify-between"><span>{t('SOCSO')}</span><span>RM {hasSalary ? '10.75' : '0.00'}</span></div>
                      <div className="flex justify-between"><span>{t('EIS')}</span><span>RM {hasSalary ? '4.30' : '0.00'}</span></div>
                      <div className="pt-3 border-t border-slate-200 flex justify-between font-bold text-indigo-600 text-base uppercase">
                        <span>{t('Total Deduct')}</span>
                        <span>RM {hasSalary ? (Number(activeStaff.salary)*0.11 + 15.05).toFixed(2) : '0.00'}</span>
                      </div>
                    </div>
                  </div>
                  {/* Card 2: Employer Contrib */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 hover:border-emerald-200 transition-colors duration-200 text-left">
                    <h3 className="text-sm font-bold text-emerald-600 uppercase border-b border-slate-200 pb-3">
                      {t('Employer Portion (Company)')}
                    </h3>
                    <div className="space-y-3 font-bold text-[11px] text-slate-600">
                      <div className="flex justify-between"><span>{t('EPF (13%)')}</span><span>RM {hasSalary ? (Number(activeStaff.salary)*0.13).toFixed(2) : '0.00'}</span></div>
                      <div className="flex justify-between"><span>{t('SOCSO')}</span><span>RM {hasSalary ? '37.65' : '0.00'}</span></div>
                      <div className="flex justify-between"><span>{t('EIS')}</span><span>RM {hasSalary ? '4.30' : '0.00'}</span></div>
                      <div className="pt-3 border-t border-slate-200 flex justify-between font-bold text-emerald-600 text-base uppercase">
                        <span>{t('Total Contrib')}</span>
                        <span>RM {hasSalary ? (Number(activeStaff.salary)*0.13 + 41.95).toFixed(2) : '0.00'}</span>
                      </div>
                    </div>
                  </div>
                  {/* Card 3: Career Tracker */}
                  <div className="bg-slate-900 career-tracker-box rounded-2xl p-6 text-white shadow-xl text-left">
                    <h3 className="text-sm font-bold text-indigo-400 uppercase border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
                      <History size={14} /> {t('Career Tracker')}
                    </h3>
                    <p className="text-[9px] text-slate-500 uppercase font-medium mb-4">{t('Aggregated since day 1.')}</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-[9px] text-slate-500 uppercase font-semibold mb-0.5">{t('Total Basic')}</p>
                        <p className="text-base font-bold text-white">RM {careerTotals.basic.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-500 uppercase font-semibold mb-0.5">{t('Total Comm')}</p>
                        <p className="text-base font-bold text-emerald-400">RM {careerTotals.comm.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-500 uppercase font-semibold mb-0.5">{t('Total EPF')}</p>
                        <p className="text-base font-bold text-indigo-300">RM {careerTotals.epf.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-500 uppercase font-semibold mb-0.5">{t('Tenure')}</p>
                        <p className="text-base font-bold text-white">{currentTenureMonths} {t('Months')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              ) : <EmptyStaffState />
            )}

            {/* LEAVE TAB */}
            {hrSubTab === 'LEAVE_APPLICATION' && (
              activeStaff.id ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {currentUser.type === 'ADMIN' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start text-left">
                    
                    {/* LEFT: Action History */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 flex flex-col h-[880px] transition-colors duration-200 text-left">
                      <h3 className="text-lg font-bold mb-6 uppercase border-b border-slate-200 pb-4 flex items-center justify-between transition-colors duration-200 text-left">
                        {t('Action History')}
                        <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] transition-colors duration-200">
                          {leaveApps.filter((a) => a.staffId === activeStaff.id).length} {t('Records')}
                        </span>
                      </h3>
                      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 text-left">
                        {Object.keys(groupedActionLogs).length === 0 ? (
                          <p className="text-center text-slate-400 font-bold uppercase text-xs py-10">
                            {t('No records found.')}
                          </p>
                        ) : (
                          Object.keys(groupedActionLogs)
                            .sort((a, b) => new Date(b) - new Date(a))
                            .map((dateGroup) => (
                              <div key={dateGroup} className="mb-6 text-left">
                                <div className="flex items-center gap-4 mb-4 text-left">
                                  <div className="h-px bg-slate-200 flex-1 transition-colors duration-200" />
                                  <span className="text-[10px] font-bold text-slate-400 uppercase text-left tracking-wider">
                                    - {dateGroup} -
                                  </span>
                                  <div className="h-px bg-slate-200 flex-1 transition-colors duration-200" />
                                </div>
                                <div className="space-y-3 text-left">
                                  {groupedActionLogs[dateGroup].map((log) => (
                                    <div
                                      key={log.id}
                                      className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between transition-all duration-200 hover:border-indigo-300 hover:shadow-sm text-left gap-4"
                                    >
                                      <div className="flex items-center gap-4 text-left">
                                        <div
                                          className={`w-3 h-3 rounded-full shrink-0 shadow-sm ${
                                            ['AL', 'SYSTEM_AL_PROBATION', 'PROFILE_UPDATE'].includes(log.type)
                                              ? 'bg-indigo-400'
                                              : log.type === 'MC'
                                              ? 'bg-emerald-400'
                                              : log.type === 'RL'
                                              ? 'bg-teal-400'
                                              : log.type === 'SL' // NEW color for Special Leave
                                              ? 'bg-violet-400'
                                              : 'bg-amber-400'
                                          }`}
                                        />
                                        <div>
                                          <p className={`font-bold text-sm uppercase text-slate-800 text-left ${log.status === 'CANCELLED' ? 'text-slate-400 line-through' : ''}`}>
                                            {t(getTypeFullName(log.finalType || log.type))} {t('Request')}
                                            {/* === NEW: Half-day badge & Extra Leave badge === */}
                                            {log.isHalfDay && <span className="ml-2 text-[8px] bg-indigo-100 text-indigo-500 px-1.5 py-0.5 rounded">½ {t('Day')}</span>}
                                            {log.finalType === 'EXTRA' && <span className="ml-2 text-[8px] bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded font-bold">{t('Extra Leave')}</span>}
                                          </p>
                                          {log.startDate && (
                                            <div className="text-[10px] font-semibold text-slate-500 mt-0.5">
                                              {log.startDate} {log.endDate && log.endDate !== log.startDate ? `to ${log.endDate}` : ''}
                                              {log.type === 'HOLIDAY_SWAP' && ` (${t(log.holidayName)})`}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      
                                      <div className="flex flex-col sm:items-end gap-1.5 text-left sm:text-right mt-2 sm:mt-0">
                                        <span className={`inline-block px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider border ${
                                            log.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                                            log.status === 'REJECTED' ? 'bg-rose-50 text-rose-600 border-rose-200' :
                                            log.status === 'CANCELLED' ? 'bg-slate-50 text-slate-500 border-slate-200' :
                                            'bg-amber-50 text-amber-600 border-amber-200'
                                        }`}>
                                          {t(log.status)}
                                        </span>
                                        <div className="text-[9px] text-slate-400 font-bold uppercase">
                                          {t('Applied Date :')} {new Date(log.appliedAt || log.id).toLocaleDateString('en-GB')}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))
                        )}
                      </div>
                    </div>

                    {/* RIGHT: Approvals + Status Balances */}
                    <div className="space-y-6 flex flex-col text-left h-full">
                      {/* Approvals */}
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col h-[320px] shrink-0 transition-colors duration-200 text-left">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 uppercase border-b border-slate-200 pb-3 transition-colors duration-200 text-slate-900">
                          {t('Approvals')} <AlertCircle className="text-amber-500" size={16} />
                        </h2>
                        <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-2">
                          {leaveApps.filter((a) => a.status === 'PENDING').length === 0 ? (
                            <div className="text-center py-16 text-slate-400 font-bold uppercase text-[10px]">
                              {t('No pending requests.')}
                            </div>
                          ) : (
                            leaveApps.filter((a) => a.status === 'PENDING').map((app) => (
                              <div
                                key={app.id}
                                className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-indigo-400 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-200 text-left"
                              >
                                <div className="space-y-1">
                                  <p className="font-bold text-slate-800 uppercase text-[10px] leading-tight">
                                    {app.staffName}
                                    <span className="mx-2 text-slate-300">|</span> 
                                    <span className="text-indigo-600">{t(getTypeFullName(app.type))}</span>
                                    {/* === NEW: half-day badge in approvals list === */}
                                    {app.isHalfDay && <span className="ml-2 text-[8px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded font-bold">½ {t('Day')}</span>}
                                  </p>
                                  <p className="text-[11px] font-semibold text-slate-500 mt-1">
                                    {app.type === 'PROFILE_UPDATE'
                                      ? t('Requested Changes to Staff Data')
                                      : app.type === 'HOLIDAY_SWAP'
                                      ? `${t('Work on Holiday')}: ${app.startDate} (${t(app.holidayName)})`
                                      : app.type === 'SL' // NEW
                                      ? `${app.slType === 'immediate' ? t('Immediate Family (3 days)') : t('Grandparent (1 day)')} — ${app.startDate}`
                                      : `${app.startDate} to ${app.endDate} (${app.days} ${t('Days')})`}
                                  </p>
                                </div>
                                <div className="flex gap-2 shrink-0 mt-2 sm:mt-0">
                                  {/* === MODIFIED: Approve button now opens special-request modal so Admin can mark as Extra Leave === */}
                                  <button
                                    onClick={() => setApproveWithExtra(app)}
                                    className="px-5 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition shadow active:scale-95 flex items-center justify-center gap-2 font-bold text-[10px] uppercase"
                                  >
                                    <Check size={14} /> {t('Approve')}
                                  </button>
                                  <button
                                    onClick={() => {
                                      setRejectPromptId(app.id);
                                      setRejectReason('');
                                    }}
                                    className="px-5 py-2.5 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition shadow active:scale-95 flex items-center justify-center gap-2 font-bold text-[10px] uppercase"
                                  >
                                    <X size={14} /> {t('Reject')}
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                      
                      {/* Status Balances */}
                      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 flex flex-col flex-1 transition-colors duration-200 text-left">
                        <h2 className="text-lg font-bold text-slate-400 uppercase mb-6 border-b border-slate-200 pb-4 flex items-center justify-between transition-colors duration-200 text-left">
                          {t('Status Balances')} <Info size={14} className="text-slate-300" />
                        </h2>
                        <div className="flex flex-col gap-6 flex-1 justify-center text-left">
                          <BalanceMetric label={t("Annual Leave")} current={earnedAL - activeStaff.alUsed} total={earnedAL} color="indigo" onInfoClick={() => setViewLeaveHistory('AL')} />
                          <BalanceMetric label={t("Medical Leave")} current={14 - activeStaff.mcUsed} total={14} color="emerald" onInfoClick={() => setViewLeaveHistory('MC')} />
                          {/* === NEW: Special Leave balance row === */}
                          <BalanceMetric label={t("Special Leave")} current={(activeStaff.slUsed || 0)} total={null} color="violet" onInfoClick={() => setViewLeaveHistory('SL')} />
                          <BalanceMetric label={t("Unpaid Leave")} current={activeStaff.uplUsed} total={null} color="rose" onInfoClick={() => setViewLeaveHistory('UPL')} />
                          <BalanceMetric label={t("Replacement")} current={activeStaff.rlUsed || 0} total={activeStaff.rlEarned || 0} color="teal" onInfoClick={() => setViewLeaveHistory('RL')} />
                        </div>
                      </div>
                    </div>

                  </div>
                ) : (
                  <>
                    {/* STAFF ONLY: Top Application Bar */}
                    <div className="bg-slate-900 dark-theme-ignore rounded-2xl p-6 shadow-lg text-white border border-slate-800 flex flex-col lg:flex-row items-center gap-6">
                      <div className="flex items-center gap-3 shrink-0">
                        <h2 className="text-lg text-white font-bold uppercase whitespace-nowrap">
                          {t('Leave Application')}
                        </h2>
                        <ArrowRight className="text-indigo-400" size={18} />
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold uppercase text-slate-400 text-left block">
                            {t('Category')}
                          </label>
                          <select
                            id="lType"
                            value={applyCategory}
                            onChange={(e) => setApplyCategory(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 font-bold outline-none cursor-pointer text-xs focus:bg-white/20 text-white select-dark-bg text-left"
                          >
                            <option value="AL" className="text-slate-900">{t('Annual Leave')}</option>
                            <option value="MC" className="text-slate-900">{t('Medical Leave')}</option>
                            <option value="RL" className="text-slate-900">{t('Replacement')}</option>
                            <option value="UPL" className="text-slate-900">{t('Unpaid Leave')}</option>
                            {/* === NEW: Special Leave option === */}
                            <option value="SL" className="text-slate-900">{t('Special Leave')}</option>
                            <option value="HOLIDAY_SWAP" className="text-slate-900">{t('Holiday Swapping')}</option>
                          </select>
                        </div>
                        
                        {applyCategory === 'HOLIDAY_SWAP' ? (
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-[9px] font-bold uppercase text-slate-400 text-left block">
                              {t('Select Holiday')}
                            </label>
                            <select
                              id="lSwapDate"
                              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 font-bold outline-none cursor-pointer text-xs focus:bg-white/20 text-white select-dark-bg text-left"
                            >
                              {johorPHs.filter(ph => !['Sultan of Johor\'s Birthday', 'Labour Day', "Agong's Birthday", 'National Day', 'Malaysia Day'].includes(ph.name)).map((ph) => (
                                <option key={ph.id} value={ph.date} className="text-slate-900">
                                  {t(ph.name)} ({ph.date})
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : applyCategory === 'SL' ? (
                          // === NEW: Special Leave sub-type + date selector ===
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-[9px] font-bold uppercase text-slate-400 text-left block">
                              {t('Special Leave')} {t('Category')}
                            </label>
                            <div className="flex gap-3">
                              <select
                                value={slType}
                                onChange={(e) => setSlType(e.target.value)}
                                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 font-bold outline-none text-xs text-white select-dark-bg"
                              >
                                <option value="immediate" className="text-slate-900">{t('Immediate Family (3 days)')}</option>
                                <option value="grandparent" className="text-slate-900">{t('Grandparent (1 day)')}</option>
                              </select>
                              <input id="lStart" type="date" className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 font-bold outline-none text-xs text-white" style={{colorScheme:'dark'}} />
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-bold uppercase text-slate-400 text-left block">
                                {t('Start Date')}
                              </label>
                              <input
                                id="lStart"
                                type="date"
                                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 font-bold outline-none text-xs focus:bg-white/20 text-white text-left"
                                style={{colorScheme: 'dark'}}
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-bold uppercase text-slate-400 text-left block">
                                {t('End Date')}
                              </label>
                              <input
                                id="lEnd"
                                type="date"
                                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 font-bold outline-none text-xs focus:bg-white/20 text-white text-left"
                                style={{colorScheme: 'dark'}}
                              />
                            </div>
                          </>
                        )}

                        {/* === NEW: Half Day / Full Day toggle (not shown for Holiday Swap or Special Leave) === */}
                        {!['HOLIDAY_SWAP', 'SL'].includes(applyCategory) && (
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-bold uppercase text-slate-400 text-left block">
                              {t('Duration')}
                            </label>
                            <div className="flex gap-2">
                              {['0.5', '1'].map(v => (
                                <button
                                  key={v}
                                  type="button"
                                  onClick={() => setApplyDuration(v)}
                                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition border ${applyDuration === v ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20'}`}
                                >
                                  {v === '0.5' ? `½ ${t('Day')}` : `1 ${t('Day')}`}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={handleSubmitLeaveWithHalfDay}
                        className="shrink-0 bg-indigo-600 px-10 py-3.5 rounded-xl font-bold uppercase text-xs shadow-lg hover:bg-indigo-700 transition active:scale-95 whitespace-nowrap lg:mt-4 text-white"
                      >
                        {t('Submit Request')}
                      </button>
                    </div>

                    {/* === NEW: AL accrual warning banner === */}
                    {applyCategory === 'AL' && !canApplyAL && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 text-amber-700 text-xs font-semibold">
                        ⚠️ {lang === 'zh'
                          ? `年假尚未累積滿1天（目前累積 ${rawAccruedAL.toFixed(2)} 天）。此申請將被視為無薪假，除非管理員批准為特批假。`
                          : `Annual Leave not yet accrued to 1 full day (currently ${rawAccruedAL.toFixed(2)} days). This will be treated as Unpaid Leave unless Admin approves as Extra Leave.`}
                      </div>
                    )}

                    {/* STAFF MIDDLE: 50/50 Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch text-left">
                      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 flex flex-col h-[460px] transition-colors duration-200 text-left">
                        <h2 className="text-lg font-bold text-slate-400 uppercase mb-6 border-b border-slate-200 pb-4 flex items-center justify-between transition-colors duration-200 text-left shrink-0">
                          {t('Johor Public Holidays 2026')} <Calendar size={14} className="text-slate-300" />
                        </h2>
                        <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-2 text-left">
                          {johorPHs.map((ph, idx) => {
                            const isPassed = new Date(ph.date + 'T00:00:00') < new Date(new Date().setHours(0,0,0,0));
                            return (
                              <div
                                key={ph.id || idx}
                                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 transition-colors duration-200 text-left"
                              >
                                <div className="flex items-center gap-3 text-left">
                                  <div className={`w-2 h-2 rounded-full ${isPassed ? 'bg-slate-300' : 'bg-amber-400'}`} />
                                  <span className={`text-xs font-bold text-slate-800 ${isPassed ? 'line-through opacity-50' : ''}`}>
                                    {t(ph.name)}
                                  </span>
                                </div>
                                <span className={`text-[10px] font-bold text-slate-500 uppercase text-left ${isPassed ? 'line-through opacity-50' : ''}`}>
                                  {new Date(ph.date).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 flex flex-col h-[460px] transition-colors duration-200 text-left">
                        <h2 className="text-lg font-bold text-slate-400 uppercase mb-6 border-b border-slate-200 pb-4 flex items-center justify-between transition-colors duration-200 text-left shrink-0">
                          {t('Status Balances')}{' '}
                          <Info size={14} className="text-slate-300" />
                        </h2>
                        <div className="flex flex-col gap-6 flex-1 justify-center text-left overflow-y-auto custom-scrollbar pr-2">
                          <BalanceMetric label={t("Annual Leave")} current={earnedAL - activeStaff.alUsed} total={earnedAL} color="indigo" onInfoClick={() => setViewLeaveHistory('AL')} />
                          <BalanceMetric label={t("Medical Leave")} current={14 - activeStaff.mcUsed} total={14} color="emerald" onInfoClick={() => setViewLeaveHistory('MC')} />
                          {/* === NEW: Special Leave balance row === */}
                          <BalanceMetric label={t("Special Leave")} current={(activeStaff.slUsed || 0)} total={null} color="violet" onInfoClick={() => setViewLeaveHistory('SL')} />
                          <BalanceMetric label={t("Unpaid Leave")} current={activeStaff.uplUsed} total={null} color="rose" onInfoClick={() => setViewLeaveHistory('UPL')} />
                          <BalanceMetric label={t("Replacement")} current={activeStaff.rlUsed || 0} total={activeStaff.rlEarned || 0} color="teal" onInfoClick={() => setViewLeaveHistory('RL')} />
                        </div>
                      </div>
                    </div>

                    {/* STAFF ACTION HISTORY: Bottom Full Width */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 transition-colors duration-200 text-left">
                      <h3 className="text-lg font-bold mb-6 uppercase border-b border-slate-200 pb-4 flex items-center justify-between transition-colors duration-200 text-left">
                        {t('Action History')}
                        <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] transition-colors duration-200">
                          {leaveApps.filter((a) => a.staffId === activeStaff.id).length} {t('Records')}
                        </span>
                      </h3>
                      <div className="max-h-[500px] overflow-y-auto custom-scrollbar pr-4 text-left">
                        {Object.keys(groupedActionLogs).length === 0 ? (
                          <p className="text-center text-slate-400 font-bold uppercase text-xs py-10">
                            {t('No records found.')}
                          </p>
                        ) : (
                          Object.keys(groupedActionLogs)
                            .sort((a, b) => new Date(b) - new Date(a))
                            .map((dateGroup) => (
                              <div key={dateGroup} className="mb-6 text-left">
                                <div className="flex items-center gap-4 mb-4 text-left">
                                  <div className="h-px bg-slate-200 flex-1 transition-colors duration-200" />
                                  <span className="text-[10px] font-bold text-slate-400 uppercase text-left tracking-wider">
                                    - {dateGroup} -
                                  </span>
                                  <div className="h-px bg-slate-200 flex-1 transition-colors duration-200" />
                                </div>
                                <div className="space-y-3 text-left">
                                  {groupedActionLogs[dateGroup].map((log) => (
                                    <div
                                      key={log.id}
                                      onClick={() =>
                                        currentUser.type === 'STAFF' &&
                                        log.status === 'PENDING' &&
                                        log.type !== 'SYSTEM_AL_PROBATION' &&
                                        setCancelPromptApp(log)
                                      }
                                      className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between transition-all duration-200 hover:border-indigo-300 hover:shadow-sm cursor-pointer text-left gap-4"
                                    >
                                      <div className="flex items-center gap-4 text-left">
                                        <div
                                          className={`w-3 h-3 rounded-full shrink-0 shadow-sm ${
                                            ['AL', 'SYSTEM_AL_PROBATION', 'PROFILE_UPDATE'].includes(log.type)
                                              ? 'bg-indigo-400'
                                              : log.type === 'MC'
                                              ? 'bg-emerald-400'
                                              : log.type === 'RL'
                                              ? 'bg-teal-400'
                                              : log.type === 'SL'
                                              ? 'bg-violet-400'
                                              : 'bg-amber-400'
                                          }`}
                                        />
                                        <div>
                                          <p className={`font-bold text-sm uppercase text-slate-800 text-left ${log.status === 'CANCELLED' ? 'text-slate-400 line-through' : ''}`}>
                                            {t(getTypeFullName(log.finalType || log.type))} {t('Request')}
                                            {log.isHalfDay && <span className="ml-2 text-[8px] bg-indigo-100 text-indigo-500 px-1.5 py-0.5 rounded">½ {t('Day')}</span>}
                                            {log.finalType === 'EXTRA' && <span className="ml-2 text-[8px] bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded font-bold">{t('Extra Leave')}</span>}
                                          </p>
                                          {log.startDate && (
                                            <div className="text-[10px] font-semibold text-slate-500 mt-0.5">
                                              {log.startDate} {log.endDate && log.endDate !== log.startDate ? `to ${log.endDate}` : ''}
                                              {log.type === 'HOLIDAY_SWAP' && ` (${t(log.holidayName)})`}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      
                                      <div className="flex flex-col sm:items-end gap-1.5 text-left sm:text-right mt-2 sm:mt-0">
                                        <span className={`inline-block px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider border ${
                                            log.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                                            log.status === 'REJECTED' ? 'bg-rose-50 text-rose-600 border-rose-200' :
                                            log.status === 'CANCELLED' ? 'bg-slate-50 text-slate-500 border-slate-200' :
                                            'bg-amber-50 text-amber-600 border-amber-200'
                                        }`}>
                                          {t(log.status)}
                                        </span>
                                        <div className="text-[9px] text-slate-400 font-bold uppercase">
                                          {t('Applied Date :')} {new Date(log.appliedAt || log.id).toLocaleDateString('en-GB')}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
              ) : <EmptyStaffState />
            )}

            {/* PAYROLL TAB */}
            {hrSubTab === 'PAYROLL' && (
              activeStaff.id ? (
              <div className="animate-in fade-in duration-500 text-left">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
                {/* LEFT: Payroll Engine */}
                <div className="text-left">
                  <div className="bg-slate-900 dark-theme-ignore rounded-2xl p-8 shadow-xl text-white border border-slate-800 transition-colors duration-200 text-left w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 border-b border-slate-700 pb-4 transition-colors duration-200 text-left gap-4">
                      <h2 className="text-lg font-bold text-white flex items-center gap-3 text-left">
                        <Wallet className="text-indigo-400" /> {t('Payroll Engine')}
                      </h2>
                      <div className="flex items-center gap-2">
                        <select
                          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-bold text-white outline-none transition-colors duration-200"
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(e.target.value)}
                        >
                          {YEARS.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </select>
                        <select
                          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-bold text-white outline-none transition-colors duration-200"
                          value={selectedMonth}
                          onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                          {MONTHS.map((m) => (
                            <option key={m} value={m}>
                              {t(m)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {currentUser.type === 'ADMIN' && (
                      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-6 space-y-4 transition-colors duration-200 text-left">
                        <select
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 font-bold text-sm text-white outline-none transition-colors duration-200 text-left"
                          value={commStaffId}
                          onChange={(e) => setCommStaffId(e.target.value)}
                        >
                          {staffList.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name} - {t(s.role)}
                            </option>
                          ))}
                        </select>
                        <div className="grid grid-cols-3 gap-4 text-left">
                          <input
                            type="number"
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 text-sm text-white outline-none transition-colors duration-200 text-left"
                            placeholder={t("Comm")}
                            value={commInput}
                            onChange={(e) => setCommInput(e.target.value)}
                          />
                          <input
                            type="number"
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 text-sm text-white outline-none transition-colors duration-200 text-left"
                            placeholder={t("Bonus")}
                            value={bonusInput}
                            onChange={(e) => setBonusInput(e.target.value)}
                          />
                          <input
                            type="number"
                            readOnly
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-400 outline-none transition-colors duration-200 text-left"
                            value={calculatedUPL}
                          />
                        </div>
                        {/* === NEW: working days reference line === */}
                        <div className="text-[9px] text-slate-500 uppercase">
                          {selectedMonth} {selectedYear} working days (excl. weekends): {payrollMonthWorkDays} days | Daily rate: RM {DAILY_RATE}
                        </div>
                        <button
                          onClick={generatePayslip}
                          className="w-full bg-indigo-500 text-white py-3 rounded-lg font-bold text-sm uppercase text-left text-center shadow-md hover:bg-indigo-600 transition"
                        >
                          {t('Generate Payslip')}
                        </button>
                      </div>
                    )}
                    <div className="flex justify-between items-center bg-indigo-500/20 p-5 rounded-xl border border-indigo-500/30 transition-colors duration-200 text-left">
                      <span className="text-xs font-bold text-indigo-200 uppercase text-left">
                        {t('Estimated Net Basic')}
                      </span>
                      <span className="text-2xl font-bold text-white text-left">
                        RM{' '}
                        {hasSalary
                          ? (activeStaff.salary - 257.05).toFixed(2)
                          : '0.00'}
                      </span>
                    </div>
                  </div>
                </div>
                </div>
                {/* RIGHT: Payslip Record */}
                <div className="text-left">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-colors duration-200 text-left">
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between transition-colors duration-200 text-left">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-3 uppercase text-left">
                      <FileText className="text-indigo-600" size={20} /> {t('Payslip Record')}
                    </h2>
                  </div>
                  <div className="overflow-x-auto text-left">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-[10px] font-bold uppercase text-slate-500 border-b border-slate-200 transition-colors duration-200 text-left">
                        <tr>
                          <th className="p-4 text-left">{t('Period')}</th>
                          <th className="p-4 text-left">{t('Basic RM')}</th>
                          <th className="p-4 text-left">{t('Commission')}</th>
                          <th className="p-4 text-left">{t('Net Total')}</th>
                          <th className="p-4 text-center">{t('View')}</th>
                          <th className="p-4 text-center">{t('Export')}</th>
                          <th className="p-4 text-center">{t('Action')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 transition-colors duration-200 text-left">
                        {payslips.filter((p) => p.staffId === activeStaff.id)
                          .length === 0 ? (
                          <tr>
                            <td
                              colSpan="7"
                              className="p-16 text-center text-slate-400 font-bold uppercase text-xs"
                            >
                              {t('No records generated.')}
                            </td>
                          </tr>
                        ) : (
                          payslips
                            .filter((p) => p.staffId === activeStaff.id)
                            .map((p) => (
                              <tr
                                key={p.id}
                                className="hover:bg-slate-50 transition transition-colors duration-200 text-left"
                              >
                                <td className="p-4 font-bold text-slate-800 uppercase text-xs text-left">
                                  {t(p.month)} {p.year}
                                </td>
                                <td className="p-4 font-semibold text-slate-600 text-xs text-left">
                                  RM {p.basic.toFixed(2)}
                                  {/* === NEW: pro-rated indicator === */}
                                  {p.originalBasic && p.basic !== p.originalBasic && (
                                    <span className="ml-1 text-[8px] text-amber-500 font-bold">Pro-rated</span>
                                  )}
                                </td>
                                <td className="p-4 font-bold text-indigo-600 text-xs text-left">
                                  RM {p.comm.toFixed(2)}
                                </td>
                                <td className="p-4 font-bold text-emerald-600 text-md text-left">
                                  RM {p.netTotal.toFixed(2)}
                                </td>
                                <td className="p-4 text-center">
                                  <button
                                    onClick={() => setViewPayslipData(p)}
                                    className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition shadow-sm w-full gap-2 text-[10px] font-bold uppercase flex justify-center items-center"
                                  >
                                    <Eye size={14} /> {t('View')}
                                  </button>
                                </td>
                                <td className="p-4 text-center">
                                  <button
                                    onClick={() =>
                                      handleDownloadPayslip(p, activeStaff)
                                    }
                                    disabled={isGeneratingPdf}
                                    className="bg-indigo-600 p-2 rounded-lg text-white hover:bg-indigo-700 shadow transition w-full gap-2 text-[10px] font-bold uppercase flex justify-center items-center disabled:opacity-50"
                                  >
                                    <Download size={14} /> {t('PDF')}
                                  </button>
                                </td>
                                <td className="p-4 text-center">
                                  {currentUser.type === 'ADMIN' && (
                                    <button
                                      onClick={() => deletePayslipRecord(p.id)}
                                      className="p-2 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-200 transition shadow-sm w-full flex justify-center items-center"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                </div>
              </div>
              ) : <EmptyStaffState />
            )}

            {/* ADMIN PANEL TAB */}
            {hrSubTab === 'ADMIN_PANEL' && (
              <div className="space-y-6 animate-in fade-in duration-500 text-left">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 transition-colors duration-200 text-left">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-3 uppercase border-b border-slate-200 pb-4 transition-colors duration-200 text-left">
                    <Settings className="text-indigo-600" size={20} /> {t('Company Profile Settings')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-bold text-slate-500 uppercase text-left block">
                        {t('Company Name')}
                      </label>
                      <input
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-sm outline-none focus:border-indigo-500 transition-colors duration-200 text-left"
                        value={companyInfo.name}
                        onChange={(e) =>
                          setCompanyInfo({ ...companyInfo, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-bold text-slate-500 uppercase text-left block">
                        {t('SSM No.')}
                      </label>
                      <input
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-sm outline-none focus:border-indigo-500 transition-colors duration-200 text-left"
                        value={companyInfo.ssm}
                        onChange={(e) =>
                          setCompanyInfo({ ...companyInfo, ssm: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-bold text-slate-500 uppercase text-left block">
                        {t('Tax No.')}
                      </label>
                      <input
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-sm outline-none focus:border-indigo-500 transition-colors duration-200 text-left"
                        value={companyInfo.tax}
                        onChange={(e) =>
                          setCompanyInfo({ ...companyInfo, tax: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end text-left">
                    <button
                      onClick={() => updateCompanyInfo(companyInfo)}
                      className="bg-indigo-600 text-white px-8 py-2.5 rounded-lg text-xs font-bold uppercase shadow-lg hover:bg-indigo-700 transition"
                    >
                      {t('Update Settings')}
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 transition-colors duration-200 text-left">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-3 uppercase border-b border-slate-200 pb-4 transition-colors duration-200 text-left">
                    <UserCircle className="text-indigo-600" size={20} /> {t('Staff Designation Registry')}
                  </h3>
                  <div className="flex gap-4 mb-6 text-left">
                    <input
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-sm outline-none focus:border-indigo-500 transition-colors duration-200 text-left"
                      placeholder={t('Enter new designation...')}
                      value={newDesigInput}
                      onChange={(e) => setNewDesigInput(e.target.value)}
                    />
                    <button
                      onClick={addDesignation}
                      className="bg-indigo-600 text-white px-6 rounded-lg text-xs font-bold uppercase hover:bg-indigo-700 transition shadow flex items-center gap-2"
                    >
                      <Plus size={16} /> {t('Add')}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                    {designations.map((d) => (
                      <div
                        key={d.id}
                        className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-center justify-between group hover:border-indigo-200 transition transition-colors duration-200 text-left"
                      >
                        <span className="text-xs font-bold text-slate-700 text-left">
                          {t(d.name)}
                        </span>
                        <button
                          onClick={() => deleteDesignation(d.id)}
                          className="text-rose-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Johor Public Holidays Registry (Admin sets master PH list; staff just view it) */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 transition-colors duration-200 text-left">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-3 uppercase border-b border-slate-200 pb-4 transition-colors duration-200 text-left">
                    <Calendar className="text-indigo-600" size={20} /> {t('Johor Public Holidays Registry')}
                  </h3>
                  <div className="flex gap-4 mb-6 text-left">
                    <input
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-sm outline-none focus:border-indigo-500 transition-colors duration-200 text-left"
                      placeholder={t('Holiday Name (e.g. Thaipusam)...')}
                      value={newJohorPHForm.name}
                      onChange={(e) => setNewJohorPHForm({ ...newJohorPHForm, name: e.target.value })}
                    />
                    <input
                      type="date"
                      className="w-48 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-sm outline-none focus:border-indigo-500 transition-colors duration-200 text-left"
                      value={newJohorPHForm.date}
                      onChange={(e) => setNewJohorPHForm({ ...newJohorPHForm, date: e.target.value })}
                    />
                    <button
                      onClick={async () => {
                        if (!newJohorPHForm.name || !newJohorPHForm.date) return;
                        const newList = [...johorPHs, { id: 'jph-' + Date.now(), name: newJohorPHForm.name, date: newJohorPHForm.date }];
                        newList.sort((a, b) => new Date(a.date) - new Date(b.date));
                        await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'settings', 'johorPHs'), { list: newList }, { merge: true });
                        setNewJohorPHForm({ name: '', date: '' });
                      }}
                      className="bg-indigo-600 text-white px-6 rounded-lg text-xs font-bold uppercase hover:bg-indigo-700 transition shadow flex items-center gap-2"
                    >
                      <Plus size={16} /> {t('Add')}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                    {johorPHs.map((ph) => (
                      <div
                        key={ph.id}
                        className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-center justify-between group hover:border-indigo-200 transition transition-colors duration-200 text-left"
                      >
                        <div className="flex flex-col items-start gap-1 text-left">
                          <span className="text-xs font-bold text-slate-700 text-left">
                            {t(ph.name)}
                          </span>
                          <span className="text-[10px] text-slate-500 text-left">
                            {new Date(ph.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        <button
                          onClick={async () => {
                            const newList = johorPHs.filter(item => item.id !== ph.id);
                            await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'settings', 'johorPHs'), { list: newList }, { merge: true });
                          }}
                          className="text-rose-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* HR Letters — single card with 4 rows */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 transition-colors duration-200 text-left">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-3 uppercase border-b border-slate-200 pb-4">
                    <FileText className="text-indigo-600" size={20} /> HR Documents
                  </h3>
                  <div className="space-y-3">
                    {[
                      { title: 'Employment Offer Letter', Icon: FileText, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                      { title: 'Confirmation Letter', Icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                      { title: 'Increment Letter', Icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50' },
                      { title: 'Warning Letter', Icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
                    ].map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 transition group">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 ${doc.bg} rounded-lg flex items-center justify-center border border-slate-100`}>
                            <doc.Icon size={18} className={doc.color} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-xs uppercase">{t(doc.title)}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{t('Generate for')} {activeStaff.name || 'Staff'}</p>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] uppercase border border-indigo-100 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition">
                          {t('EXPORT PDF')} <Download size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- CUSTOM APP ALERTS (Replaces Native Browser Alert) --- */}
        {appAlert.show && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[600] flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 transition-colors duration-200 text-left">
              <div className="p-6 bg-indigo-600 text-white flex justify-between items-center">
                <h2 className="text-sm font-bold uppercase tracking-wider">{t(appAlert.title)}</h2>
                <button onClick={closeAlert} className="hover:bg-indigo-500 p-1 rounded-lg transition text-white">
                  <X size={18} />
                </button>
              </div>
              <div className="p-8 text-center space-y-6">
                <p className="text-slate-700 font-semibold text-sm leading-relaxed">
                  {appAlert.message}
                </p>
                <button
                  onClick={closeAlert}
                  className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-indigo-700 transition text-xs uppercase tracking-widest"
                >
                  {t('OK')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* === NEW MODAL: Approve with possible Extra Leave override (Special Request) === */}
        {approveWithExtra && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[400] flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
              <div className="p-6 bg-emerald-600 text-white flex justify-between items-center">
                <h2 className="text-lg font-bold uppercase">{t('Approve')}</h2>
                <button onClick={() => setApproveWithExtra(null)}><X size={18} /></button>
              </div>
              <div className="p-8 space-y-4 text-left">
                <p className="text-sm font-semibold text-slate-700 text-center leading-relaxed">
                  {approveWithExtra.staffName} — {t(getTypeFullName(approveWithExtra.type))}
                  {approveWithExtra.startDate && (
                    <span className="block text-slate-500 text-xs mt-1">
                      {approveWithExtra.startDate}{approveWithExtra.endDate && approveWithExtra.endDate !== approveWithExtra.startDate ? ` to ${approveWithExtra.endDate}` : ''}
                    </span>
                  )}
                </p>
                <div className="bg-violet-50 border border-violet-200 rounded-lg p-3">
                  <p className="text-xs text-violet-700 font-semibold">
                    {t('Mark as Extra Leave')}: {lang === 'zh' ? '批准但不從任何餘額或工資中扣除（特批假）。' : 'Approve without deducting from any leave balance or pay.'}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => { processLeave(approveWithExtra.id, 'APPROVED', '', false); setApproveWithExtra(null); }}
                    className="w-full bg-emerald-500 text-white font-bold py-3 rounded-xl hover:bg-emerald-600 transition text-xs uppercase"
                  >
                    ✓ {t('Approve')} ({t('Normal')})
                  </button>
                  <button
                    onClick={() => { processLeave(approveWithExtra.id, 'APPROVED', '', true); setApproveWithExtra(null); }}
                    className="w-full bg-violet-500 text-white font-bold py-3 rounded-xl hover:bg-violet-600 transition text-xs uppercase"
                  >
                    ★ {t('Mark as Extra Leave')}
                  </button>
                  <button
                    onClick={() => setApproveWithExtra(null)}
                    className="w-full bg-white border border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition text-xs uppercase"
                  >
                    {t('Cancel')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === NEW MODAL: Probation ended notification (Confirm or Extend) === */}
        {probationPromptStaff && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[400] flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
              <div className="p-6 bg-amber-500 text-white flex justify-between items-center">
                <h2 className="text-lg font-bold uppercase">⏰ {t('Probation Ended')}</h2>
                <button onClick={() => setProbationPromptStaff(null)}><X size={18} /></button>
              </div>
              <div className="p-8 space-y-4 text-left">
                <p className="text-sm font-semibold text-slate-700 text-center">
                  <strong>{probationPromptStaff.name || probationPromptStaff.username}</strong>{lang === 'zh' ? '的試用期已於' : "'s probation ended on"} <strong>{probationPromptStaff.probationEndDate}</strong>{lang === 'zh' ? '結束。' : '.'}
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleConfirmEmployment(probationPromptStaff.id, false)}
                    className="w-full bg-emerald-500 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-600 transition text-xs uppercase flex items-center justify-center gap-2"
                  >
                    <UserCheck size={16} /> {t('Confirm Employment')}
                  </button>
                  <button
                    onClick={() => handleConfirmEmployment(probationPromptStaff.id, true)}
                    className="w-full bg-amber-500 text-white font-bold py-3.5 rounded-xl hover:bg-amber-600 transition text-xs uppercase"
                  >
                    {t('Extend Probation')} (+3 {t('Months')})
                  </button>
                  <button
                    onClick={() => setProbationPromptStaff(null)}
                    className="w-full bg-white border border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition text-xs uppercase"
                  >
                    {t('Cancel')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ALL MODALS PRESERVED AS PER BASE */}
        {viewPayslipData && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-6 bg-slate-900 text-white flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-indigo-400" />
                  <h2 className="text-lg font-bold uppercase">
                    {t('Payslip Preview -')} {t(viewPayslipData.month)}
                  </h2>
                </div>
                <button onClick={() => setViewPayslipData(null)}>
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 overflow-y-auto bg-slate-50 space-y-6 flex-1 text-left">
                <div className="bg-white p-8 rounded-xl shadow-sm border space-y-6 text-left">
                  <div className="flex justify-between border-b pb-4 text-left">
                    <h3 className="font-black text-indigo-600 text-xl uppercase tracking-tighter text-left">
                      {currentUser.company}
                    </h3>
                    <div className="text-right text-[10px] text-slate-500 font-bold uppercase">
                      {t('Official Document')}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 text-xs font-bold uppercase gap-6 text-left">
                    <div className="text-left">
                      <span className="text-slate-400 block mb-1 text-left">{t('Employee:')}</span>{' '}
                      {activeStaff.name || activeStaff.username}
                    </div>
                    <div className="text-left">
                      <span className="text-slate-400 block mb-1 text-left">{t('Period:')}</span>{' '}
                      {t(viewPayslipData.month)} {viewPayslipData.year}
                    </div>
                    <div className="text-left">
                      <span className="text-slate-400 block mb-1 text-left">
                        {t('Basic Salary:')}
                      </span>{' '}
                      RM {viewPayslipData.basic.toFixed(2)}
                    </div>
                    <div className="text-left">
                      <span className="text-slate-400 block mb-1 text-left">
                        {t('Total Deductions:')}
                      </span>{' '}
                      RM {viewPayslipData.totalDeductions.toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 flex justify-between items-center text-left">
                    <span className="font-bold text-slate-600 uppercase text-xs tracking-wider text-left">
                      {t('Nett Income')}
                    </span>
                    <span className="text-3xl font-black text-indigo-600 text-left">
                      RM {viewPayslipData.netTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleDownloadPayslip(viewPayslipData, activeStaff)
                  }
                  disabled={isGeneratingPdf}
                  className="w-full bg-indigo-600 py-4 rounded-xl text-white font-bold uppercase text-xs shadow-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 tracking-widest disabled:opacity-50 text-left"
                >
                  {isGeneratingPdf ? (
                    t('GENERATING PDF...')
                  ) : (
                    <>
                      <Download size={18} /> {t('DOWNLOAD PDF COPY')}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {isAddStaffModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[300] flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 bg-indigo-600 text-white flex justify-between items-center">
                <h2 className="text-lg font-bold uppercase">
                  {t('Initialize New Staff')}
                </h2>
                <button onClick={() => setIsAddStaffModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleConfirmAddStaff} className="p-8 space-y-6 text-left">
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-indigo-600 text-sm text-slate-900 text-left"
                  placeholder={t("Set Username")}
                  value={newStaffForm.username}
                  onChange={(e) =>
                    setNewStaffForm({ ...newStaffForm, username: e.target.value })
                  }
                  required
                />
                <input
                  type="password"
                  name="password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-indigo-600 text-sm text-slate-900 text-left"
                  placeholder={t("Set Password")}
                  value={newStaffForm.password}
                  onChange={(e) =>
                    setNewStaffForm({ ...newStaffForm, password: e.target.value })
                  }
                  required
                />
                {/* === NEW: Probation note === */}
                <p className="text-[9px] text-amber-600 font-medium">
                  {lang === 'zh' ? '試用期結束日期將自動計算（加入日期後3個月）。' : 'Probation end date will be auto-calculated (3 months from join date).'}
                </p>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-lg shadow-xl hover:bg-indigo-700 transition text-xs uppercase"
                >
                  {t('Create Account')}
                </button>
              </form>
            </div>
          </div>
        )}

        {isEditProfileModalOpen && (
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden">
              <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-indigo-600 rounded-lg">
                    <Edit3 size={18} />
                  </div>
                  <h2 className="text-lg font-bold uppercase">{t('Update Details')}</h2>
                </div>
                <button onClick={() => setIsEditProfileModalOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <form
                onSubmit={handleSaveProfile}
                className="p-8 space-y-6 bg-white overflow-y-auto max-h-[75vh] text-left"
              >
                <div className="grid grid-cols-2 gap-6 text-left">
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-semibold text-slate-500 uppercase block text-left">
                      {t('Legal Name')}
                    </label>
                    <input
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-sm outline-none focus:border-indigo-500 text-slate-900 text-left"
                      value={editForm.name || ''}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-semibold text-slate-500 uppercase block text-left">
                      {t('Contact No.')}
                    </label>
                    <input
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-sm outline-none focus:border-indigo-500 text-slate-900 text-left"
                      value={editForm.phone || ''}
                      onChange={(e) =>
                        setEditForm({ ...editForm, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-semibold text-slate-500 uppercase block text-left">
                      {t('IC Number')}
                    </label>
                    <input
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-sm outline-none focus:border-indigo-500 text-slate-900 text-left"
                      value={editForm.ic || ''}
                      onChange={(e) =>
                        setEditForm({ ...editForm, ic: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-semibold text-slate-500 uppercase block text-left">
                      {t('Gender')}
                    </label>
                    <select
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-sm outline-none text-slate-900 text-left"
                      value={editForm.gender || ''}
                      onChange={(e) =>
                        setEditForm({ ...editForm, gender: e.target.value })
                      }
                    >
                      <option value="Male">{t('Male')}</option>
                      <option value="Female">{t('Female')}</option>
                    </select>
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-semibold text-slate-500 uppercase block text-left">
                      {t('Designation')}
                    </label>
                    <select
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-sm outline-none text-slate-900 text-left"
                      value={editForm.role || ''}
                      onChange={(e) =>
                        setEditForm({ ...editForm, role: e.target.value })
                      }
                    >
                      {designations.map((d) => (
                        <option key={d.id} value={d.name}>
                          {t(d.name)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-semibold text-slate-500 uppercase block text-left">
                      {t('Join Date')}
                    </label>
                    <input
                      type="date"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-sm outline-none text-slate-900 text-left"
                      value={editForm.joinDate || ''}
                      onChange={(e) =>
                        setEditForm({ ...editForm, joinDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-semibold text-slate-500 uppercase block text-left">
                      {t('Probation End Date')}
                    </label>
                    <input
                      type="date"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-sm outline-none text-slate-900 text-left"
                      value={editForm.probationEndDate || ''}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          probationEndDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-semibold text-slate-500 uppercase block text-left">
                      {t('EPF ID')}
                    </label>
                    <input
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-sm outline-none text-slate-900 text-left"
                      value={editForm.epfNo || ''}
                      onChange={(e) =>
                        setEditForm({ ...editForm, epfNo: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-semibold text-slate-500 uppercase block text-left">
                      {t('SOCSO ID')}
                    </label>
                    <input
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-sm outline-none text-slate-900 text-left"
                      value={editForm.socsoNo || ''}
                      onChange={(e) =>
                        setEditForm({ ...editForm, socsoNo: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-semibold text-slate-500 uppercase block text-left">
                      {t('Monthly Basic (RM)')}
                    </label>
                    <input
                      type="number"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-sm outline-none text-slate-900 text-left"
                      value={editForm.salary || 0}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          salary: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  {/* === NEW: Admin-only Username assignment field === */}
                  {currentUser.type === 'ADMIN' && (
                    <div className="space-y-1 text-left col-span-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase block text-left">
                        {t('Username')} ({lang === 'zh' ? '僅限管理員' : 'Admin Only'})
                      </label>
                      <input
                        className="w-full bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-2.5 font-medium text-sm outline-none focus:border-indigo-500 text-slate-900 text-left"
                        placeholder={lang === 'zh' ? '當員工ID出來後在此填寫' : 'Assign once staff ID is ready'}
                        value={editForm.username || ''}
                        onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                      />
                      <p className="text-[9px] text-slate-400">
                        {lang === 'zh' ? '一旦設置用戶名，員工必須用用戶名而非法定姓名登入。' : 'Once set, staff must login with Username instead of Legal Name.'}
                      </p>
                    </div>
                  )}
                  {/* === NEW: Admin-only Active/Resigned status field === */}
                  {currentUser.type === 'ADMIN' && (
                    <div className="space-y-1 text-left">
                      <label className="text-xs font-semibold text-slate-500 uppercase block text-left">
                        {t('Status')}
                      </label>
                      <select
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-sm outline-none text-slate-900 text-left"
                        value={editForm.status || 'active'}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      >
                        <option value="active">{t('Active')}</option>
                        <option value="resigned">{t('Resigned')}</option>
                      </select>
                    </div>
                  )}
                  {/* === NEW: Admin-only manual Confirm Employment toggle === */}
                  {currentUser.type === 'ADMIN' && (
                    <div className="space-y-1 text-left">
                      <label className="text-xs font-semibold text-slate-500 uppercase block text-left">
                        {t('Status: Confirmed Employment')}
                      </label>
                      <select
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-sm outline-none text-slate-900 text-left"
                        value={editForm.confirmed ? 'yes' : 'no'}
                        onChange={(e) => setEditForm({ ...editForm, confirmed: e.target.value === 'yes' })}
                      >
                        <option value="no">{t('Status: Probation Period')}</option>
                        <option value="yes">{t('Status: Confirmed Employment')} ✓</option>
                      </select>
                    </div>
                  )}
                </div>
                <div className="flex gap-4 pt-6 border-t border-slate-100 text-left">
                  <button
                    type="button"
                    onClick={() => setIsEditProfileModalOpen(false)}
                    className="flex-1 py-3 rounded-lg font-bold text-slate-500 uppercase text-sm hover:bg-slate-50 border border-slate-200"
                  >
                    {t('Cancel')}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white rounded-lg font-bold uppercase text-sm shadow-lg hover:bg-indigo-700 transition"
                  >
                    {t('Save Changes')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {rejectPromptId && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[300] flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
              <div className="p-6 bg-rose-500 text-white flex justify-between items-center">
                <h2 className="text-lg font-bold uppercase">
                  {t('Reject Application')}
                </h2>
                <button onClick={() => setRejectPromptId(null)}>
                  <X size={18} />
                </button>
              </div>
              <div className="p-8 space-y-6 text-left">
                <textarea
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-rose-500 font-medium text-sm h-24 resize-none text-slate-900 text-left"
                  placeholder={t("Reason (Optional)")}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
                <div className="flex gap-3 text-left">
                  <button
                    onClick={() => setRejectPromptId(null)}
                    className="flex-1 bg-white border border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition text-xs uppercase"
                  >
                    {t('Cancel')}
                  </button>
                  <button
                    onClick={() => {
                      processLeave(rejectPromptId, 'REJECTED', rejectReason);
                      setRejectPromptId(null);
                    }}
                    className="flex-1 bg-rose-500 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-rose-600 transition text-xs uppercase"
                  >
                    {t('Confirm Reject')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {cancelPromptApp && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[300] flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 bg-rose-500 text-white flex justify-between items-center">
                <h2 className="text-lg font-bold uppercase">
                  {t('Cancel Application')}
                </h2>
                <button onClick={() => setCancelPromptApp(null)}>
                  <X size={18} />
                </button>
              </div>
              <div className="p-8 space-y-6 text-left">
                <p className="text-sm font-semibold text-slate-700 leading-relaxed text-center text-left">
                  {t('Are you sure you want to cancel this request?')}
                </p>
                <div className="flex gap-3 text-left">
                  <button
                    onClick={() => setCancelPromptApp(null)}
                    className="flex-1 bg-white border border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition text-xs uppercase"
                  >
                    {t('Back')}
                  </button>
                  <button
                    onClick={async () => {
                      const app = cancelPromptApp;
                      await updateLeaveApp(app.id, { status: 'CANCELLED' });
                      setCancelPromptApp(null);
                      triggerAlert(t('Cancelled.'));
                    }}
                    className="flex-1 bg-rose-500 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-rose-600 transition text-xs uppercase"
                  >
                    {t('Confirm')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewLeaveHistory && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[300] flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                <h2 className="text-lg font-bold uppercase">
                  {t(viewLeaveHistory.replace('_', ' '))} {t('Status')}
                </h2>
                <button onClick={() => setViewLeaveHistory(null)}>
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar text-left space-y-6">
                
                {/* LABOR LAW EXPLANATION BLOCK */}
                <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                  <div className="flex gap-3">
                    <Info size={18} className="text-indigo-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-indigo-900 leading-relaxed font-medium">
                      {getLawText(viewLeaveHistory, lang)}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-3 border-b border-slate-100 pb-2">{t('Approved Records')}</h4>
                  {leaveApps.filter(
                    (a) =>
                      a.staffId === activeStaff.id &&
                      a.type === viewLeaveHistory &&
                      a.status === 'APPROVED'
                  ).length === 0 ? (
                    <div className="text-center text-xs font-bold text-slate-400 py-6 uppercase text-left">
                      {t('No data.')}
                    </div>
                  ) : (
                    leaveApps
                      .filter(
                        (a) =>
                          a.staffId === activeStaff.id &&
                          a.type === viewLeaveHistory &&
                          a.status === 'APPROVED'
                      )
                      .map((log) => (
                        <div
                          key={log.id}
                          className="p-4 bg-slate-50 rounded-xl border border-l-4 border-indigo-500 flex justify-between items-center mb-3 text-left"
                        >
                          <div className="text-left">
                            <p className="font-bold text-sm text-left">
                              {log.startDate} - {log.endDate}
                            </p>
                            <p className="text-[10px] text-slate-500 text-left">
                              {log.actionAt}
                            </p>
                          </div>
                          <span className="bg-indigo-100 text-indigo-600 font-bold px-3 py-1 rounded-lg text-xs text-left">
                            {log.days}d
                          </span>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {waivePromptData && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[300] flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 bg-amber-500 text-white flex justify-between items-center">
                <h2 className="text-lg font-bold uppercase">{t('Probation Policy')}</h2>
              </div>
              <div className="p-8 space-y-6 text-left">
                <p className="text-sm font-semibold text-slate-700 leading-relaxed text-left">
                  {t('Handle Annual Leave count?')}
                </p>
                <div className="space-y-3 text-left">
                  <button
                    onClick={() => confirmWaive(false)}
                    className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl text-xs uppercase text-left text-center"
                  >
                    {t('Proceed Counting AL')}
                  </button>
                  <button
                    onClick={() => confirmWaive(true)}
                    className="w-full bg-rose-500 text-white font-bold py-3.5 rounded-xl text-xs uppercase text-left text-center"
                  >
                    {t('Waive (Ignore) AL')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const BalanceMetric = ({ label, current, total, color, onInfoClick }) => {
  const percentage = total
    ? Math.max(0, Math.min(100, (current / total) * 100))
    : 0;
  return (
    <div className="group flex flex-col text-left">
      <div className="flex justify-between items-end mb-2 text-left">
        <div className="flex items-baseline gap-2 text-left">
          <span className={`text-2xl font-bold text-${color}-600 uppercase leading-none text-left`}>
            {typeof current === 'number' ? (current % 1 === 0 ? current : current.toFixed(1)) : current}
          </span>
          <span className="text-xs font-bold text-slate-400 uppercase leading-none text-left">
            {total !== null ? `/ ${total} Days` : 'Days Taken'}
          </span>
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 leading-none text-right">
          {label}
          {onInfoClick && (
            <button
              onClick={onInfoClick}
              className={`text-${color}-400 hover:text-${color}-600 transition`}
              title="View Status"
            >
              <Info size={14} />
            </button>
          )}
        </span>
      </div>
      {total !== null && (
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200 text-left">
          <div
            className={`h-full bg-${color}-500 transition-all duration-1000 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default App;