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
  Globe
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

// LIVE DATE (动态获取当前现实时间)
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

// --- DICTIONARY FOR TRANSLATION ---
const dict = {
  'PROFILE': '个人资料',
  'LEAVE APPLICATION': '请假申请',
  'PAYROLL': '工资单',
  'ADMIN PANEL': '管理面板',
  'Leave Application': '请假申请',
  'Category': '假期类别',
  'Start Date': '开始日期',
  'End Date': '结束日期',
  'Submit Request': '提交申请',
  'Optional Public Holidays (Max 6)': '可选公共假期 (最多6天)',
  'Apply': '申请',
  'Convert': '转换',
  'Status Balances': '假期余额',
  'Annual Leave': '年假',
  'Medical Leave': '病假',
  'Public Holiday': '公共假期',
  'Unpaid Leave': '无薪假',
  'Replacement': '补假',
  'Action History': '操作记录',
  'Records': '条记录',
  'No records found.': '暂无记录。',
  'Approvals': '审批',
  'No pending requests.': '没有待处理的请求。',
  'Chinese New Year': '农历新年',
  'Hari Raya Aidilfitri': '开斋节',
  'Wesak Day': '卫塞节',
  'Awal Muharram': '回历元旦',
  'Deepavali': '屠妖节',
  'Christmas Day': '圣诞节',
  'Management Portal': '管理门户',
  'Sign In': '登入',
  'Username': '用户名',
  'Password': '密码',
  'Create Account': '创建账号',
  'Initialize New Staff': '初始化新员工',
  'Company Profile Settings': '公司资料设置',
  'Staff Designation Registry': '员工职位管理',
  'Payroll Engine': '工资核算引擎',
  'Generate Payslip': '生成工资单',
  'Optional Public Holidays Registry': '可选公共假期管理',
  'Status: Confirmed Employment': '状态：已确认正式员工',
  'Status: Probation Period': '状态：试用期',
  'Employee Portion (Deduct)': '员工扣除部分',
  'Employer Portion (Company)': '雇主缴纳部分',
  'Total Deduct': '总扣除',
  'Total Contrib': '总缴纳',
  'Career Tracker': '职业追踪',
  'Aggregated since day 1.': '从第一天起累计。',
  'Total Basic': '总底薪',
  'Total Comm': '总提成',
  'Total EPF': '总公积金',
  'Tenure': '工龄',
  'Months': '个月',
  'Requested Changes to Staff Data': '要求更改员工数据',
  'PH Selection': '公共假期选择',
  'Holidays to RL': '天假期转为补假',
  'Applied Date :': '申请日期：',
  'Estimated Net Basic': '预计净底薪',
  'Johor Public Holidays 2026': '2026年柔佛公共假期',
  'Payslip Record': '工资单记录',
  'No records generated.': '没有生成记录。',
  'Export': '导出',
  'View': '查看',
  'Action': '操作',
  'Period': '期间',
  'Basic RM': '底薪 RM',
  'Commission': '提成',
  'Net Total': '净收入',
  'PDF': 'PDF',
  'Company Name': '公司名称',
  'SSM No.': '公司注册号 (SSM)',
  'Tax No.': '税号',
  'Update Settings': '更新设置',
  'Enter new designation...': '输入新职位...',
  'Add': '添加',
  'Holiday Name (e.g. Thaipusam)...': '假期名称(如：大宝森节)...',
  'Date (e.g. Jan 25)': '日期(如：Jan 25)',
  'Employment Offer Letter': '录用通知书',
  'Confirmation Letter': '转正信',
  'Increment Letter': '加薪信',
  'Warning Letter': '警告信',
  'Generate for': '生成给',
  'EXPORT PDF': '导出 PDF',
  'Payslip Preview -': '工资单预览 -',
  'Official Document': '官方文件',
  'Employee:': '员工：',
  'Period:': '期间：',
  'Basic Salary:': '基本工资：',
  'Total Deductions:': '总扣除额：',
  'Nett Income': '净收入',
  'GENERATING PDF...': '生成PDF中...',
  'DOWNLOAD PDF COPY': '下载PDF副本',
  'Set Username': '设置用户名',
  'Set Password': '设置密码',
  'Update Details': '更新详细信息',
  'Legal Name': '法定姓名',
  'Contact No.': '联系电话',
  'IC Number': '身份证号',
  'Gender': '性别',
  'Male': '男',
  'Female': '女',
  'Designation': '职位',
  'Join Date': '入职日期',
  'Probation End Date': '试用期结束日期',
  'EPF ID': '公积金账号',
  'SOCSO ID': '社险账号',
  'Monthly Basic (RM)': '月基本工资 (RM)',
  'Cancel': '取消',
  'Save Changes': '保存更改',
  'Reject Application': '拒绝申请',
  'Reason (Optional)': '原因 (可选)',
  'Confirm Reject': '确认拒绝',
  'Cancel Application': '取消申请',
  'Are you sure you want to cancel this request?': '您确定要取消此请求吗？',
  'Back': '返回',
  'Confirm': '确认',
  'Select Target Date': '选择目标日期',
  'Submit': '提交',
  'Status': '状态',
  'No data.': '无数据。',
  'Probation Policy': '试用期政策',
  'Handle Annual Leave count?': '处理年假计算？',
  'Proceed Counting AL': '继续计算年假',
  'Waive (Ignore) AL': '豁免(忽略)年假',
  'Staff Access Selection': '员工权限选择',
  'Headcount:': '总人数：',
  'Active': '活跃',
  'CREATE': '创建',
  'Ref:': '参考号：',
  'Days': '天',
  'Days Taken': '已用天数',
  'No Staff Record Found': '未找到员工记录',
  'Please click "CREATE STAFF" to initialize the database.': '请点击“创建”来初始化数据库。',
  'Sultan Johor Birthday': '柔佛苏丹诞辰',
  'Labour Day': '劳动节',
  'Agong Birthday': '国家元首诞辰',
  'National Day': '国庆日',
  'Malaysia Day': '马来西亚日',
  'Comm': '提成',
  'Bonus': '奖金',
  'Request': '请求',
  'Contact': '联系方式',
  'IC Identity': '身份证号',
  'Prob. End Date': '试用期结束',
  'Monthly Basic': '月基本工资',
  'Daily Rate': '日工资率',
  'EPF (11%)': '公积金 (11%)',
  'SOCSO': '社险 (SOCSO)',
  'EIS': '就业保险 (EIS)',
  'EPF (13%)': '公积金 (13%)',
  'System Notification': '系统通知',
  'OK': '确定',
  'Dates are required.': '请选择日期。',
  'Record Updated Successfully.': '记录更新成功。',
  'Application Submitted / 已提交申请': '申请已提交。',
  'Maximum 6 optional Public Holidays can be selected.': '最多只能选择 6 个可选公共假期。',
  'Select new holidays first.': '请先选择需要转换的假期。',
  'Please specify the target date.': '请指定目标日期。',
  'Update Submitted for Admin Approval.': '资料更新已提交，等待管理员审批。',
  'Staff account created.': '员工账号创建成功。',
  'Select staff member.': '请选择要操作的员工。',
  'Record Deleted.': '记录已删除。',
  'Company Info Updated.': '公司信息已成功更新。',
  'Cancelled.': '已成功取消。',
  'January': '一月', 'February': '二月', 'March': '三月', 'April': '四月', 
  'May': '五月', 'June': '六月', 'July': '七月', 'August': '八月', 
  'September': '九月', 'October': '十月', 'November': '十一月', 'December': '十二月',
  'Approve': '批准',
  'Reject': '拒绝',
  'PENDING': '待处理',
  'APPROVED': '已批准',
  'REJECTED': '已拒绝',
  'CANCELLED': '已取消',
  'Approved Records': '已批准记录'
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
  };
  return types[type] || type;
};

// HR Tenure Calculator Helper (精确HR月份进位算法)
const getMonthsDiff = (startStr, endStr) => {
  if (!startStr || !endStr) return 0;
  const s = new Date(startStr);
  const e = new Date(endStr);
  let months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  
  // HR标准满15天算一个月：如果日期的差距超过15天，代表多做了一个月；如果少于-15天，则减去未满的一个月。
  const dayDiff = e.getDate() - s.getDate();
  if (dayDiff >= 15) {
    months += 1;
  } else if (dayDiff < -15) {
    months -= 1;
  }
  return Math.max(0, months);
};

// Malaysian Labor Law Helper for "i" Button Info
const getLawText = (type, lang) => {
  if (lang === 'zh') {
    switch (type) {
      case 'AL': return '根据1955年劳工法令，员工享有年假：服务1-2年为8天，2-5年为12天，5年以上为16天。';
      case 'MC': return '根据1955年劳工法令，未住院病假：服务少于2年为14天，2-5年为18天，5年以上为22天。';
      case 'PH': return '雇主须提供至少11天法定公共假期，包含5天强制假期（国庆日、元首诞辰、苏丹诞辰、劳动节、马来西亚日）。';
      case 'UPL': return '无薪假须经公司批准，扣薪将根据员工的每日底薪率进行计算。';
      case 'RL': return '补假由公司政策决定，通常用于补偿在公共假期或休息日的工作。';
      default: return '';
    }
  } else {
    switch (type) {
      case 'AL': return 'Employment Act 1955: Annual leave entitlement is 8 days (1-2 yrs service), 12 days (2-5 yrs), and 16 days (>5 yrs).';
      case 'MC': return 'Employment Act 1955: Sick leave (non-hospitalized) is 14 days (<2 yrs service), 18 days (2-5 yrs), and 22 days (>5 yrs).';
      case 'PH': return 'Employers must observe at least 11 gazetted public holidays, including 5 mandatory days (National Day, Agong\'s Birthday, Ruler\'s Birthday, Labour Day, Malaysia Day).';
      case 'UPL': return 'Unpaid leave is subject to management approval. Deductions are calculated based on the employee\'s daily basic rate.';
      case 'RL': return 'Replacement leave is granted based on company policy for work performed on public holidays or rest days.';
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
  const [optionalPHs, setOptionalPHs] = useState([]);
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

  // Modal States
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [viewPayslipData, setViewPayslipData] = useState(null);
  const [viewLeaveHistory, setViewLeaveHistory] = useState(null);
  const [waivePromptData, setWaivePromptData] = useState(null);
  const [rejectPromptId, setRejectPromptId] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [convertPromptData, setConvertPromptData] = useState(null);
  const [convertTargetDate, setConvertTargetDate] = useState('');
  const [cancelPromptApp, setCancelPromptApp] = useState(null);

  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [draftPHs, setDraftPHs] = useState([]);
  const [newStaffForm, setNewStaffForm] = useState({
    username: '',
    password: '',
  });
  const [editForm, setEditForm] = useState({});
  const [newDesigInput, setNewDesigInput] = useState('');
  const [newPHForm, setNewPHForm] = useState({ name: '', date: '' });

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
            selectedPHs: [],
            convertedPHs: [],
            company: 'AG Health Enterprise',
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

    const unsubPHs = onSnapshot(doc(db, 'artifacts', appId, 'public', 'data', 'settings', 'optionalPHs'), (snap) => {
      if (snap.exists()) {
        setOptionalPHs(snap.data().list || []);
      } else {
        const initial = [
          { id: 'ph-cny', name: 'Chinese New Year', date: 'Feb 17' },
          { id: 'ph-hari-raya', name: 'Hari Raya Aidilfitri', date: 'Mar 20' },
          { id: 'ph-wesak', name: 'Wesak Day', date: 'May 1' },
          { id: 'ph-awal-muharram', name: 'Awal Muharram', date: 'Jun 17' },
          { id: 'ph-deepavali', name: 'Deepavali', date: 'Nov 8' },
          { id: 'ph-christmas', name: 'Christmas Day', date: 'Dec 25' },
        ];
        setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'settings', 'optionalPHs'), { list: initial });
        setOptionalPHs(initial);
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
      unsubStaff(); unsubLeaves(); unsubPayslips(); unsubDesig(); unsubCompany(); unsubPHs();
    };
  }, [fbUser]);

  // --- DERIVED DATA ---
  const activeStaff = useMemo(
    () => staffList.find((s) => s.id === selectedStaffId) || staffList[0] || {},
    [staffList, selectedStaffId]
  );

  useEffect(() => {
    if (activeStaff.id) setDraftPHs(activeStaff.selectedPHs || []);
  }, [activeStaff]);

  const hasSalary = Number(activeStaff?.salary) > 0;
  const DAILY_RATE = useMemo(
    () => (hasSalary ? (Number(activeStaff.salary) / 22).toFixed(2) : '0.00'),
    [activeStaff, hasSalary]
  );

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
    const m = Number(staff?.tenureMonths) || 1;
    const salary = Number(staff?.salary) || 0;
    return {
      netPay: (salary - 257.05) * m,
      eis: 4.3 * m,
      epf: 242.0 * m,
      socso: 10.75 * m,
      basic: salary * m,
      comm: 0,
    };
  };

  const careerTotals = useMemo(
    () => getStaffYTD(activeStaff?.id),
    [activeStaff, payslips]
  );

  const calculatedUPL = useMemo(() => {
    return leaveApps
      .filter(
        (app) =>
          app.staffId === commStaffId &&
          app.type === 'UPL' &&
          app.status === 'APPROVED'
      )
      .reduce((sum, app) => {
        const monthName = new Date(app.startDate).toLocaleString('default', {
          month: 'long',
        });
        return monthName === selectedMonth ? sum + app.days : sum;
      }, 0);
  }, [leaveApps, commStaffId, selectedMonth]);

  // Uses improved HR standard month calculation
  const currentTenureMonths = activeStaff?.joinDate
    ? getMonthsDiff(activeStaff.joinDate, TODAY)
    : activeStaff?.tenureMonths || 0;

  const earnedAL = useMemo(() => {
    if (!activeStaff.id) return 0;
    let probMonths = currentTenureMonths;
    let confirmedMonths = 0;
    if (activeStaff?.joinDate && activeStaff?.probationEndDate) {
      const probEnd = new Date(activeStaff.probationEndDate);
      const join = new Date(activeStaff.joinDate);
      const probDiff = getMonthsDiff(join, probEnd);
      if (probEnd <= TODAY) {
        probMonths = probDiff;
        confirmedMonths = Math.max(0, currentTenureMonths - probMonths);
      } else {
        probMonths = currentTenureMonths;
        confirmedMonths = 0;
      }
    }
    let totalAL = !activeStaff?.alWaivedProbation ? probMonths * 0.5 : 0;
    totalAL += confirmedMonths * (8 / 12);
    return Math.max(0, Math.floor(totalAL));
  }, [activeStaff, currentTenureMonths]);

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

  const isPhLocked = (phId) => {
    if (activeStaff.convertedPHs?.includes(phId)) return true;
    if (activeStaff.selectedPHs?.includes(phId)) return true;
    return leaveApps.some(app =>
      app.staffId === activeStaff.id &&
      (app.type === 'PH_UPDATE' || app.type === 'PH_CONVERT_BATCH') &&
      ['PENDING', 'APPROVED'].includes(app.status) &&
      app.data?.includes(phId)
    );
  };

  // --- PERSISTENCE WRAPPERS ---
  const updateStaffData = async (sid, data) => {
    await setDoc(
      doc(db, 'artifacts', appId, 'public', 'data', 'staff', sid),
      data,
      { merge: true }
    );
  };

  const addLeaveApp = async (app) => {
    const id = `leave-${Date.now()}`;
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

  const handleDraftTogglePH = (phId, isChecked) => {
    if (isChecked) {
      if (draftPHs.length >= 6)
        return triggerAlert(t('Maximum 6 optional Public Holidays can be selected.'));
      setDraftPHs([...draftPHs, phId]);
    } else {
      setDraftPHs(draftPHs.filter((id) => id !== phId));
    }
  };

  const submitPHSelection = async () => {
    await addLeaveApp({
      staffId: activeStaff.id,
      username: activeStaff.username,
      staffName: activeStaff.name,
      type: 'PH_UPDATE',
      days: draftPHs.length,
      data: draftPHs,
      status: 'PENDING',
      appliedAt: Date.now(),
      timestamp: new Date().toLocaleString(),
      actionAt: null,
    });
  };

  const triggerBatchConvert = () => {
    const newToConvert = draftPHs.filter(
      (id) =>
        !activeStaff.selectedPHs?.includes(id) &&
        !activeStaff.convertedPHs?.includes(id)
    );
    if (newToConvert.length === 0) return triggerAlert(t('Select new holidays first.'));
    setConvertPromptData(newToConvert);
    setConvertTargetDate('');
  };

  const confirmBatchConvert = async () => {
    if (!convertTargetDate) return triggerAlert(t('Please specify the target date.'));
    await addLeaveApp({
      staffId: activeStaff.id,
      username: activeStaff.username,
      staffName: activeStaff.name,
      type: 'PH_CONVERT_BATCH',
      data: convertPromptData,
      days: convertPromptData.length,
      targetDate: convertTargetDate,
      status: 'PENDING',
      appliedAt: Date.now(),
      timestamp: new Date().toLocaleString(),
      actionAt: null,
    });
    setDraftPHs((prev) => prev.filter((id) => !convertPromptData.includes(id)));
    setConvertPromptData(null);
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
      
      if (
        (!oldStaff.probationEndDate || oldStaff.probationEndDate === '') &&
        editForm.probationEndDate
      ) {
        setIsEditProfileModalOpen(false); 
        return setWaivePromptData({ editForm });
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

  const processLeave = async (id, status, reason = '') => {
    const actionTime = new Date().toLocaleString();
    const app = leaveApps.find((a) => a.id === id);
    if (!app) return;
    await updateLeaveApp(id, {
      status,
      actionAt: actionTime,
      rejectReason: reason,
    });
    if (status === 'APPROVED') {
      const s = staffList.find((s) => s.id === app.staffId);
      let updates = {};
      if (app.type === 'PROFILE_UPDATE') {
        updates = app.data;
      } else if (app.type === 'PH_UPDATE') {
        updates = { selectedPHs: app.data, phUsed: app.data.length };
      } else if (app.type === 'PH_CONVERT_BATCH') {
        updates = {
          convertedPHs: [...(s.convertedPHs || []), ...app.data],
          rlEarned: (s.rlEarned || 0) + app.days,
          rlUsed: (s.rlUsed || 0) + app.days,
        };
      } else {
        const typeKey =
          app.type === 'AL'
            ? 'alUsed'
            : app.type === 'MC'
            ? 'mcUsed'
            : app.type === 'RL'
            ? 'rlUsed'
            : 'uplUsed';
        updates = { [typeKey]: (s[typeKey] || 0) + app.days };
      }
      await updateStaffData(app.staffId, updates);
    }
  };

  const handleConfirmAddStaff = async (e) => {
    e.preventDefault();
    if (!newStaffForm.username || !newStaffForm.password) return;
    const newId = `staff-${Date.now()}`;
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
      joinDate: TODAY.toISOString().split('T')[0],
      probationEndDate: '',
      alWaivedProbation: false,
      tenureMonths: 0,
      alUsed: 0,
      mcUsed: 0,
      uplUsed: 0,
      phUsed: 0,
      rlUsed: 0,
      rlEarned: 0,
      selectedPHs: [],
      convertedPHs: [],
      company: companyInfo.name,
    };
    await setDoc(
      doc(db, 'artifacts', appId, 'public', 'data', 'staff', newId),
      newStaff
    );
    setSelectedStaffId(newId);
    setCommStaffId(newId);
    setNewStaffForm({ username: '', password: '' });
    setIsAddStaffModalOpen(false);
    triggerAlert(t('Staff account created.'));
  };

  const generatePayslip = async () => {
    const target = staffList.find((s) => s.id === commStaffId);
    if (!target) return triggerAlert(t('Select staff member.'));
    const basic = Number(target.salary),
      comm = parseFloat(commInput) || 0,
      bonus = parseFloat(bonusInput) || 0;
    const uplDeduction = calculatedUPL * (basic / 22);
    const netTotal =
      basic + comm + bonus - (242.0 + 10.75 + 4.3 + 0 + uplDeduction);
    const id = `slip-${Date.now()}`;
    await setDoc(
      doc(db, 'artifacts', appId, 'public', 'data', 'payslips', id),
      {
        id,
        staffId: target.id,
        month: selectedMonth,
        year: Number(selectedYear),
        basic,
        comm,
        bonus,
        uplDays: calculatedUPL,
        dailyRate: basic / 22,
        uplDeduction,
        empEpf: 242.0,
        empSocso: 10.75,
        empEis: 4.3,
        tax: 0,
        totalEarnings: basic + comm + bonus,
        totalDeductions: 242.0 + 10.75 + 4.3 + 0 + uplDeduction,
        netTotal,
        employerEpf: 286.0,
        employerSocso: 37.65,
        employerEis: 4.3,
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
    
    // Upgraded PDF Layout (Helvetica + Added Spacing)
    element.innerHTML = `
      <div style="width: 210mm; height: 285mm; padding: 12mm; font-family: Helvetica, Arial, sans-serif; color: #1e293b; background: white; box-sizing: border-box; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="border-bottom: 3px solid #4f46e5; padding-bottom: 10px; margin-bottom: 20px;">
            <h1 style="margin: 0; color: #4f46e5; text-transform: uppercase; font-size: 26px; font-weight: 900; letter-spacing: 0.5px;">${
              staff.company
            }</h1>
            <p style="margin: 2px 0; font-size: 10px; color: #64748b; font-weight: normal; letter-spacing: 0.5px;">(Registration No. ${
              companyInfo.ssm
            })</p>
            <p style="margin: 8px 0 0; font-weight: 800; color: #1e293b; font-size: 15px;">OFFICIAL PAYSLIP - ${
              t(payslip.month)
            } ${payslip.year}</p>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 12px; line-height: 1.6;">
            <div><p><strong>Employee:</strong> ${
              staff.name || staff.username
            }</p><p><strong>Position:</strong> ${
      t(staff.role)
    }</p><p><strong>ID:</strong> ${staff.username}</p></div>
            <div style="text-align: right;"><p><strong>IC No:</strong> ${
              staff.ic || '-'
            }</p><p><strong>EPF No:</strong> ${
      staff.epfNo || '-'
    }</p><p><strong>SOCSO No:</strong> ${staff.socsoNo || '-'}</p></div>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px; font-size: 12px;">
            <thead><tr style="background: #f1f5f9; text-align: left;"><th style="padding: 10px 12px; border-bottom: 2px solid #e2e8f0; font-weight: 800;">EARNINGS</th><th style="padding: 10px 12px; border-bottom: 2px solid #e2e8f0; text-align: right; font-weight: 800;">AMOUNT (RM)</th></tr></thead>
            <tbody><tr><td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">Basic Salary</td><td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; text-align: right;">${payslip.basic.toFixed(
              2
            )}</td></tr><tr><td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">Commission</td><td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; text-align: right;">${payslip.comm.toFixed(
      2
    )}</td></tr><tr><td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">Bonus</td><td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; text-align: right;">${payslip.bonus.toFixed(
      2
    )}</td></tr></tbody>
          </table>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px; font-size: 12px;">
            <thead><tr style="background: #f1f5f9; text-align: left;"><th style="padding: 10px 12px; border-bottom: 2px solid #e2e8f0; font-weight: 800;">EMPLOYEE DEDUCTIONS</th><th style="padding: 10px 12px; border-bottom: 2px solid #e2e8f0; text-align: right; font-weight: 800;">AMOUNT (RM)</th></tr></thead>
            <tbody style="color: #ef4444;"><tr><td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">Unpaid Leave (${
              payslip.uplDays
            } days)</td><td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold;">-${payslip.uplDeduction.toFixed(
      2
    )}</td></tr><tr><td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">EPF (11%)</td><td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold;">-242.00</td></tr><tr><td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">SOCSO</td><td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold;">-10.75</td></tr><tr><td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9;">EIS</td><td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold;">-4.30</td></tr></tbody>
          </table>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 12px;">
            <thead><tr style="background: #f8fafc; text-align: left; color: #059669;"><th style="padding: 10px 12px; border-bottom: 2px solid #e2e8f0; font-weight: 800;">EMPLOYER CONTRIBUTIONS (For Info)</th><th style="padding: 10px 12px; border-bottom: 2px solid #e2e8f0; text-align: right; font-weight: 800;">AMOUNT (RM)</th></tr></thead>
            <tbody><tr><td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">EPF (13%)</td><td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold;">${payslip.employerEpf.toFixed(
              2
            )}</td></tr><tr><td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">SOCSO</td><td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold;">${payslip.employerSocso.toFixed(
      2
    )}</td></tr><tr><td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">EIS</td><td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; text-align: right; font-weight: bold;">${payslip.employerEis.toFixed(
      2
    )}</td></tr></tbody>
          </table>
          
          <div style="display: flex; justify-content: space-between; align-items: center; background: #4f46e5; color: white; padding: 15px 20px; border-radius: 8px; margin-top: 20px; font-size: 18px; font-weight: 900;">
            <span>NETT PAY</span>
            <span>RM ${payslip.netTotal.toFixed(2)}</span>
          </div>
        </div>
        
        <div>
          <div style="background: #0f172a; color: white; padding: 20px; border-radius: 8px; margin-top: 20px; margin-bottom: 10px;">
            <h4 style="margin: 0 0 10px 0; color: #818cf8; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Career Tracker (Since Joined)</h4>
            <div style="display: flex; justify-content: space-between; font-size: 15px; font-weight: bold;">
               <div><span style="color: #94a3b8; display: block; font-size: 9px; margin-bottom: 4px;">TOTAL BASIC</span>RM ${ytd.basic.toLocaleString(
                 undefined,
                 { minimumFractionDigits: 2, maximumFractionDigits: 2 }
               )}</div>
               <div><span style="color: #94a3b8; display: block; font-size: 9px; margin-bottom: 4px;">TOTAL COMM</span><span style="color: #34d399;">RM ${ytd.comm.toLocaleString(
                 undefined,
                 { minimumFractionDigits: 2, maximumFractionDigits: 2 }
               )}</span></div>
               <div><span style="color: #94a3b8; display: block; font-size: 9px; margin-bottom: 4px;">TOTAL EPF</span><span style="color: #a5b4fc;">RM ${ytd.epf.toLocaleString(
                 undefined,
                 { minimumFractionDigits: 2, maximumFractionDigits: 2 }
               )}</span></div>
            </div>
          </div>
          <div style="font-size: 9px; text-align: center; color: #94a3b8; border-top: 1px dashed #e2e8f0; padding-top: 8px;">This is a computer-generated payslip. No signature is required. Tax No: ${
            companyInfo.tax
          }</div>
        </div>
      </div>
    `;
    const opt = {
      margin: 0,
      filename: `Payslip_${staff.username}_${payslip.month}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
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

  const addOptionalPH = async () => {
    if (!newPHForm.name || !newPHForm.date) return;
    const newList = [...optionalPHs, { id: `ph-${Date.now()}`, name: newPHForm.name, date: newPHForm.date }];
    await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'settings', 'optionalPHs'), { list: newList }, { merge: true });
    setNewPHForm({ name: '', date: '' });
  };

  const deleteOptionalPH = async (id) => {
    const newList = optionalPHs.filter(ph => ph.id !== id);
    await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'settings', 'optionalPHs'), { list: newList }, { merge: true });
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
    const staff = staffList.find(
      (u) => u.username === loginForm.user && u.password === loginForm.pass
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
        user: staff.username,
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
                    {staffList.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name || s.username}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div className="text-[10px] font-bold text-slate-500 uppercase">
                  {t('Headcount:')} {staffList.length} {t('Active')}
                </div>
              </div>
              <button
                onClick={() => setIsAddStaffModalOpen(true)}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700 transition shadow-md flex items-center gap-2"
              >
                <Plus size={14} /> {t('CREATE')}
              </button>
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
                        {
                          label: t('Join Date'),
                          value: activeStaff.joinDate || 'Not Set',
                        },
                        {
                          label: t('Prob. End Date'),
                          value: activeStaff.probationEndDate || 'Not Set',
                        },
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
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4 hover:border-indigo-200 transition-colors duration-200 text-left">
                    <h3 className="text-lg font-bold text-indigo-500 uppercase border-b border-slate-200 pb-4 transition-colors duration-200 text-left">
                      {t('Employee Portion (Deduct)')}
                    </h3>
                    <div className="space-y-3 font-bold text-[11px] text-slate-600">
                      <div className="flex justify-between">
                        <span>{t('EPF (11%)')}</span>
                        <span>RM {hasSalary ? '242.00' : '0.00'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('SOCSO')}</span>
                        <span>RM {hasSalary ? '10.75' : '0.00'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('EIS')}</span>
                        <span>RM {hasSalary ? '4.30' : '0.00'}</span>
                      </div>
                      <div className="pt-3 border-t border-slate-200 flex justify-between font-bold text-indigo-600 text-lg uppercase transition-colors duration-200">
                        <span>{t('Total Deduct')}</span>
                        <span>RM {hasSalary ? '257.05' : '0.00'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4 hover:border-emerald-200 transition-colors duration-200 text-left">
                    <h3 className="text-lg font-bold text-emerald-600 uppercase border-b border-slate-200 pb-4 transition-colors duration-200 text-left">
                      {t('Employer Portion (Company)')}
                    </h3>
                    <div className="space-y-3 font-bold text-[11px] text-slate-600">
                      <div className="flex justify-between">
                        <span>{t('EPF (13%)')}</span>
                        <span>RM {hasSalary ? '286.00' : '0.00'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('SOCSO')}</span>
                        <span>RM {hasSalary ? '37.65' : '0.00'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('EIS')}</span>
                        <span>RM {hasSalary ? '4.30' : '0.00'}</span>
                      </div>
                      <div className="pt-3 border-t border-slate-200 flex justify-between font-bold text-emerald-600 text-lg uppercase transition-colors duration-200">
                        <span>{t('Total Contrib')}</span>
                        <span>RM {hasSalary ? '327.95' : '0.00'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900 career-tracker-box rounded-2xl p-10 text-white shadow-xl relative overflow-hidden group text-left">
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 text-left">
                    <div className="md:w-1/4 border-r border-white/10 pr-6 text-left">
                      <h3 className="text-lg font-bold text-indigo-400 uppercase mb-2 flex items-center gap-2 justify-start">
                        <History size={16} /> {t('Career Tracker')}
                      </h3>
                      <p className="text-[9px] text-slate-400 uppercase font-medium leading-relaxed text-left">
                        {t('Aggregated since day 1.')}
                      </p>
                    </div>
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
                      <div className="text-left">
                        <p className="text-[10px] text-slate-500 uppercase font-semibold mb-1 text-left">
                          {t('Total Basic')}
                        </p>
                        <p className="text-xl font-bold text-white tracking-preserve text-left">
                          RM{' '}
                          {careerTotals.basic.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] text-slate-500 uppercase font-semibold mb-1 text-left">
                          {t('Total Comm')}
                        </p>
                        <p className="text-xl font-bold text-emerald-400 tracking-preserve text-left">
                          RM{' '}
                          {careerTotals.comm.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] text-slate-500 uppercase font-semibold mb-1 text-left">
                          {t('Total EPF')}
                        </p>
                        <p className="text-xl font-bold text-indigo-300 tracking-preserve text-left">
                          RM{' '}
                          {careerTotals.epf.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] text-slate-500 uppercase font-semibold mb-1 text-left">
                          {t('Tenure')}
                        </p>
                        <p className="text-xl font-bold text-white tracking-preserve text-left">
                          {currentTenureMonths} {t('Months')}
                        </p>
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
                                              : 'bg-amber-400'
                                          }`}
                                        />
                                        <div>
                                          <p className={`font-bold text-sm uppercase text-slate-800 text-left ${log.status === 'CANCELLED' ? 'text-slate-400 line-through' : ''}`}>
                                            {t(getTypeFullName(log.type))} {t('Request')}
                                          </p>
                                          {log.startDate && (
                                            <div className="text-[10px] font-semibold text-slate-500 mt-0.5">
                                              {log.startDate} to {log.endDate}
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
                                  </p>
                                  <p className="text-[11px] font-semibold text-slate-500 mt-1">
                                    {app.type === 'PROFILE_UPDATE'
                                      ? t('Requested Changes to Staff Data')
                                      : app.type === 'PH_UPDATE'
                                      ? `${t('PH Selection')} (${app.days} items)`
                                      : app.type === 'PH_CONVERT_BATCH'
                                      ? `${t('Convert')} ${app.days} ${t('Holidays to RL')}`
                                      : `${app.startDate} to ${app.endDate} (${app.days} ${t('Days')})`}
                                  </p>
                                </div>
                                <div className="flex gap-2 shrink-0 mt-2 sm:mt-0">
                                  <button
                                    onClick={() => processLeave(app.id, 'APPROVED')}
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
                          <BalanceMetric label={t("Public Holiday")} current={6 - (activeStaff.phUsed || 0)} total={6} color="amber" onInfoClick={() => setViewLeaveHistory('PH')} />
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
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold uppercase text-slate-400 text-left block">
                            {t('Category')}
                          </label>
                          <select
                            id="lType"
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 font-bold outline-none cursor-pointer text-xs focus:bg-white/20 text-white select-dark-bg text-left"
                          >
                            <option value="AL" className="text-slate-900">
                              {t('Annual Leave')}
                            </option>
                            <option value="MC" className="text-slate-900">
                              {t('Medical Leave')}
                            </option>
                            <option value="RL" className="text-slate-900">
                              {t('Replacement')}
                            </option>
                            <option value="UPL" className="text-slate-900">
                              {t('Unpaid Leave')}
                            </option>
                          </select>
                        </div>
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
                      </div>
                      <button
                        onClick={() => {
                          const start = document.getElementById('lStart').value,
                            end = document.getElementById('lEnd').value,
                            type = document.getElementById('lType').value;
                          if (!start || !end) return triggerAlert(t('Dates are required.'));
                          const days =
                            Math.ceil(
                              Math.abs(new Date(end) - new Date(start)) /
                                (1000 * 60 * 60 * 24)
                            ) + 1;
                          addLeaveApp({
                            staffId: currentUser.id,
                            username: currentUser.username,
                            staffName: currentUser.name,
                            type,
                            startDate: start,
                            endDate: end,
                            days,
                            status: 'PENDING',
                            timestamp: new Date().toLocaleString(),
                            actionAt: null,
                          });
                        }}
                        className="shrink-0 bg-indigo-600 px-10 py-3.5 rounded-xl font-bold uppercase text-xs shadow-lg hover:bg-indigo-700 transition active:scale-95 whitespace-nowrap lg:mt-4 text-white"
                      >
                        {t('Submit Request')}
                      </button>
                    </div>

                    {/* STAFF MIDDLE: 50/50 Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch text-left">
                      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 flex flex-col h-full transition-colors duration-200 text-left">
                        <h2 className="text-lg font-bold text-slate-400 uppercase mb-4 border-b border-slate-200 pb-3 transition-colors duration-200 text-left">
                          {t('Optional Public Holidays (Max 6)')}
                        </h2>
                        <div className="space-y-2 mb-6 flex-1 text-left">
                          {optionalPHs.map((ph) => {
                            const locked = isPhLocked(ph.id);
                            const checked = draftPHs.includes(ph.id) || locked;
                            return (
                              <div
                                key={ph.id}
                                className={`flex items-center justify-between p-2.5 rounded-lg border bg-slate-50 border-slate-100 transition transition-colors duration-200 text-left ${locked ? 'opacity-60' : 'hover:bg-slate-100'}`}
                              >
                                <label className={`flex items-center gap-3 flex-1 text-left ${locked ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    disabled={locked}
                                    onChange={(e) => handleDraftTogglePH(ph.id, e.target.checked)}
                                    className="custom-checkbox"
                                  />
                                  <div className="text-left">
                                    <p className={`text-[11px] font-bold text-slate-800 text-left ${locked ? 'line-through' : ''}`}>
                                      {t(ph.name)} <span className="font-normal text-slate-500 ml-1">({ph.date})</span>
                                    </p>
                                  </div>
                                </label>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex gap-4 text-left">
                          <button
                            onClick={submitPHSelection}
                            className="flex-1 bg-indigo-600 text-white py-3 rounded-xl text-xs font-bold uppercase shadow-sm hover:bg-indigo-700 transition"
                          >
                            {t('Apply')}
                          </button>
                          <button
                            onClick={triggerBatchConvert}
                            className="flex-1 bg-teal-500 text-white py-3 rounded-xl text-xs font-bold uppercase shadow-sm hover:bg-teal-600 transition"
                          >
                            {t('Convert')}
                          </button>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 h-full transition-colors duration-200 text-left">
                        <h2 className="text-lg font-bold text-slate-400 uppercase mb-6 border-b border-slate-200 pb-4 flex items-center justify-between transition-colors duration-200 text-left">
                          {t('Status Balances')}{' '}
                          <Info size={14} className="text-slate-300" />
                        </h2>
                        <div className="flex flex-col gap-8 text-left">
                          <BalanceMetric label={t("Annual Leave")} current={earnedAL - activeStaff.alUsed} total={earnedAL} color="indigo" onInfoClick={() => setViewLeaveHistory('AL')} />
                          <BalanceMetric label={t("Medical Leave")} current={14 - activeStaff.mcUsed} total={14} color="emerald" onInfoClick={() => setViewLeaveHistory('MC')} />
                          <BalanceMetric label={t("Public Holiday")} current={6 - (activeStaff.phUsed || 0)} total={6} color="amber" onInfoClick={() => setViewLeaveHistory('PH')} />
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
                                              : 'bg-amber-400'
                                          }`}
                                        />
                                        <div>
                                          <p className={`font-bold text-sm uppercase text-slate-800 text-left ${log.status === 'CANCELLED' ? 'text-slate-400 line-through' : ''}`}>
                                            {t(getTypeFullName(log.type))} {t('Request')}
                                          </p>
                                          {log.startDate && (
                                            <div className="text-[10px] font-semibold text-slate-500 mt-0.5">
                                              {log.startDate} to {log.endDate}
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
              <div className="space-y-6 animate-in fade-in duration-500 text-left">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start text-left">
                  {/* REQ 2: Payroll Engine Black Card */}
                  <div className="bg-slate-900 dark-theme-ignore rounded-2xl p-8 shadow-xl text-white border border-slate-800 transition-colors duration-200 text-left">
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
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 h-full transition-colors duration-200 text-left">
                    <h2 className="text-lg font-bold mb-6 uppercase border-b border-slate-100 pb-4 transition-colors duration-200 text-left text-slate-900">
                      {t('Johor Public Holidays 2026')}
                    </h2>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2 text-left">
                      {[
                        { name: 'Sultan Johor Birthday', date: '2026-03-23' },
                        { name: 'Labour Day', date: '2026-05-01' },
                        { name: 'Agong Birthday', date: '2026-06-01' },
                        { name: 'National Day', date: '2026-08-31' },
                        { name: 'Malaysia Day', date: '2026-09-16' },
                      ].map((ph, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 transition-colors duration-200 text-left"
                        >
                          <div className="flex items-center gap-3 text-left">
                            <div className={`w-2 h-2 rounded-full ${new Date(ph.date) < TODAY ? 'bg-slate-300' : 'bg-amber-400'}`} />
                            <span className={`text-xs font-bold text-slate-800 ${new Date(ph.date) < TODAY ? 'line-through opacity-50' : ''}`}>
                              {t(ph.name)}
                            </span>
                          </div>
                          <span className={`text-[10px] font-bold text-slate-500 uppercase text-left ${new Date(ph.date) < TODAY ? 'line-through opacity-50' : ''}`}>
                            {new Date(ph.date).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-6 transition-colors duration-200 text-left">
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

                {/* Optional Public Holidays Registry (Admin Panel) */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 transition-colors duration-200 text-left">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-3 uppercase border-b border-slate-200 pb-4 transition-colors duration-200 text-left">
                    <Calendar className="text-indigo-600" size={20} /> {t('Optional Public Holidays Registry')}
                  </h3>
                  <div className="flex gap-4 mb-6 text-left">
                    <input
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-sm outline-none focus:border-indigo-500 transition-colors duration-200 text-left"
                      placeholder={t('Holiday Name (e.g. Thaipusam)...')}
                      value={newPHForm.name}
                      onChange={(e) => setNewPHForm({ ...newPHForm, name: e.target.value })}
                    />
                    <input
                      className="w-48 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 font-medium text-sm outline-none focus:border-indigo-500 transition-colors duration-200 text-left"
                      placeholder={t('Date (e.g. Jan 25)')}
                      value={newPHForm.date}
                      onChange={(e) => setNewPHForm({ ...newPHForm, date: e.target.value })}
                    />
                    <button
                      onClick={addOptionalPH}
                      className="bg-indigo-600 text-white px-6 rounded-lg text-xs font-bold uppercase hover:bg-indigo-700 transition shadow flex items-center gap-2"
                    >
                      <Plus size={16} /> {t('Add')}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                    {optionalPHs.map((ph) => (
                      <div
                        key={ph.id}
                        className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-center justify-between group hover:border-indigo-200 transition transition-colors duration-200 text-left"
                      >
                        <div className="flex items-baseline gap-2 text-left">
                          <span className="text-xs font-bold text-slate-700 text-left">
                            {t(ph.name)}
                          </span>
                          <span className="text-[10px] text-slate-500 text-left">({ph.date})</span>
                        </div>
                        <button
                          onClick={() => deleteOptionalPH(ph.id)}
                          className="text-rose-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                  {[
                    {
                      title: 'Employment Offer Letter',
                      Icon: FileText,
                      color: 'text-indigo-500',
                    },
                    {
                      title: 'Confirmation Letter',
                      Icon: CheckCircle2,
                      color: 'text-emerald-500',
                    },
                    {
                      title: 'Increment Letter',
                      Icon: TrendingUp,
                      color: 'text-blue-500',
                    },
                    {
                      title: 'Warning Letter',
                      Icon: AlertCircle,
                      color: 'text-rose-500',
                    },
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center group hover:shadow-md transition transition-colors duration-200 text-left"
                    >
                      <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-50 transition border border-slate-100 transition-colors duration-200">
                        <doc.Icon size={24} className={doc.color} />
                      </div>
                      <h3 className="font-bold text-slate-800 mb-2 uppercase text-xs text-left">
                        {t(doc.title)}
                      </h3>
                      <p className="text-[10px] text-slate-400 mb-6 font-medium uppercase text-left">
                        {t('Generate for')} {activeStaff.name}
                      </p>
                      <button className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] uppercase border-b-2 border-indigo-50 pb-1">
                        {t('EXPORT PDF')} <Download size={14} />
                      </button>
                    </div>
                  ))}
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

        {convertPromptData && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[300] flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 bg-teal-500 text-white flex justify-between items-center">
                <h2 className="text-lg font-bold uppercase">
                  {t('Select Target Date')}
                </h2>
                <button onClick={() => setConvertPromptData(null)}>
                  <X size={18} />
                </button>
              </div>
              <div className="p-8 space-y-6 text-left">
                <input
                  type="date"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 font-bold outline-none focus:border-teal-500 text-sm text-slate-900 text-left"
                  value={convertTargetDate}
                  onChange={(e) => setConvertTargetDate(e.target.value)}
                />
                <div className="flex gap-3 pt-2 text-left">
                  <button
                    onClick={() => setConvertPromptData(null)}
                    className="flex-1 bg-white border border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition text-xs uppercase"
                  >
                    {t('Cancel')}
                  </button>
                  <button
                    onClick={confirmBatchConvert}
                    className="flex-1 bg-teal-500 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-teal-600 transition text-xs uppercase"
                  >
                    {t('Submit')}
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
            {current}
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