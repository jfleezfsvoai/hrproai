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

const TODAY = new Date('2026-03-27');
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
  'EPF (13%)': '公积金 (13%)'
};

// --- HELPERS ---
const formatPHDateStr = (dateStr) => {
  const d = new Date(`${dateStr}, 2026`);
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

const App = () => {
  // --- AUTH STATE ---
  const [currentUser, setCurrentUser] = useState(null);
  const [fbUser, setFbUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ user: '', pass: '' });
  const [loginError, setLoginError] = useState('');

  // --- THEME & LANG STATE ---
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState('en');

  // Translation Helper
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
  const [selectedStaffId, setSelectedStaffId] = useState('shan-01');
  const [commStaffId, setCommStaffId] = useState('shan-01');
  const [commInput, setCommInput] = useState('');
  const [bonusInput, setBonusInput] = useState('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Modal States
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
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
  const [verifyPass, setVerifyPass] = useState('');
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

    // Staff Sync
    const staffRef = collection(
      db,
      'artifacts',
      appId,
      'public',
      'data',
      'staff'
    );
    const unsubStaff = onSnapshot(
      staffRef,
      (snap) => {
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
          setDoc(
            doc(db, 'artifacts', appId, 'public', 'data', 'staff', initial.id),
            initial
          );
        }
        setStaffList(list);
      },
      (err) => console.error('Staff sync failed', err)
    );

    // Leaves Sync
    const leaveRef = collection(
      db,
      'artifacts',
      appId,
      'public',
      'data',
      'leaveApps'
    );
    const unsubLeaves = onSnapshot(
      leaveRef,
      (snap) => {
        setLeaveApps(snap.docs.map((d) => ({ ...d.data(), id: d.id })));
      },
      (err) => console.error('Leaves sync failed', err)
    );

    // Payslips Sync
    const payslipRef = collection(
      db,
      'artifacts',
      appId,
      'public',
      'data',
      'payslips'
    );
    const unsubPayslips = onSnapshot(
      payslipRef,
      (snap) => {
        setPayslips(snap.docs.map((d) => ({ ...d.data(), id: d.id })));
      },
      (err) => console.error('Payslips sync failed', err)
    );

    // Designations Sync
    const designationsRef = collection(
      db,
      'artifacts',
      appId,
      'public',
      'data',
      'designations'
    );
    const unsubDesig = onSnapshot(designationsRef, (snap) => {
      const list = snap.docs.map((d) => ({ ...d.data(), id: d.id }));
      if (list.length === 0) {
        const initialList = [
          'Sales Personal Assistant',
          'Sales Staff',
          'Senior Sales Staff',
          'Sales Staff Manager',
          'Video Editor',
          'Accountant',
          'Marketer',
        ];
        initialList.forEach((name) => addDoc(designationsRef, { name }));
      }
      setDesignations(list);
    });

    // Optional PHs Sync
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

    // Company Info Sync
    const companyRef = doc(
      db,
      'artifacts',
      appId,
      'public',
      'data',
      'companyInfo',
      'main'
    );
    const unsubCompany = onSnapshot(companyRef, (docSnap) => {
      if (docSnap.exists()) {
        setCompanyInfo(docSnap.data());
      } else {
        setDoc(companyRef, { name: 'AG Health Enterprise', ssm: '', tax: '' });
      }
    });

    return () => {
      unsubStaff();
      unsubLeaves();
      unsubPayslips();
      unsubDesig();
      unsubCompany();
      unsubPHs();
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

  const getMonthsDiff = (start, end) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    return Math.max(
      0,
      (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth())
    );
  };

  const currentTenureMonths = activeStaff?.joinDate
    ? Math.max(
        0,
        (TODAY.getFullYear() - new Date(activeStaff.joinDate).getFullYear()) *
          12 +
          (TODAY.getMonth() - new Date(activeStaff.joinDate).getMonth())
      )
    : activeStaff?.tenureMonths || 0;

  const earnedAL = useMemo(() => {
    if (!activeStaff.id) return 0;
    let probMonths = currentTenureMonths;
    let confirmedMonths = 0;
    if (activeStaff?.joinDate && activeStaff?.probationEndDate) {
      const probEnd = new Date(activeStaff.probationEndDate);
      const join = new Date(activeStaff.joinDate);
      const probDiff =
        (probEnd.getFullYear() - join.getFullYear()) * 12 +
        (probEnd.getMonth() - join.getMonth());
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
    alert(t('Application Submitted / 已提交申请'));
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
        return alert(t('Maximum 6 optional Public Holidays can be selected.'));
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
    if (newToConvert.length === 0) return alert(t('Select new holidays first.'));
    setConvertPromptData(newToConvert);
    setConvertTargetDate('');
  };

  const confirmBatchConvert = async () => {
    if (!convertTargetDate) return alert(t('Please specify the target date.'));
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
        return setWaivePromptData({ editForm });
      }
      await updateStaffData(editForm.id, finalEditForm);
      setIsEditProfileModalOpen(false);
      alert(t('Record Updated Successfully.'));
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
      alert(t('Update Submitted for Admin Approval.'));
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
    setIsEditProfileModalOpen(false);
    setWaivePromptData(null);
    alert(t('Record Updated Successfully.'));
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
    alert(t(`Staff account created.`));
  };

  const generatePayslip = async () => {
    const target = staffList.find((s) => s.id === commStaffId);
    if (!target) return alert(t('Select staff member.'));
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
        year: 2026,
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
    alert(t('Record Deleted.'));
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
    element.innerHTML = `
      <div style="width: 210mm; height: 285mm; padding: 12mm; font-family: 'Inter', Helvetica, Arial, sans-serif; color: #1e293b; background: white; box-sizing: border-box; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="border-bottom: 3px solid #4f46e5; padding-bottom: 10px; margin-bottom: 20px;">
            <h1 style="margin: 0; color: #4f46e5; text-transform: uppercase; font-size: 26px; font-weight: 900;">${
              staff.company
            }</h1>
            <p style="margin: 2px 0; font-size: 10px; color: #64748b; font-weight: normal; letter-spacing: 0.5px;">(Registration No. ${
              companyInfo.ssm
            })</p>
            <p style="margin: 8px 0 0; font-weight: 800; color: #1e293b; font-size: 15px;">OFFICIAL PAYSLIP - ${
              payslip.month
            } ${payslip.year}</p>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 12px; line-height: 1.6;">
            <div><p><strong>Employee:</strong> ${
              staff.name || staff.username
            }</p><p><strong>Position:</strong> ${
      staff.role
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
          <table style="width: 100%; border-collapse: collapse; font-size: 18px; margin-top: 5px;"><tr style="background: #4f46e5; color: white; font-weight: 900;"><td style="padding: 15px;">NETT PAY</td><td style="padding: 15px; text-align: right;">RM ${payslip.netTotal.toFixed(
            2
          )}</td></tr></table>
        </div>
        <div>
          <div style="background: #0f172a; color: white; padding: 20px; border-radius: 8px; margin-bottom: 10px;">
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
    alert(t('Company Info Updated.'));
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

  const handleLogout = () => {
    setCurrentUser(null);
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
      setCurrentUser({ ...admin });
      setHrSubTab('PROFILE');
      setLoginError('');
    } else if (staff) {
      setCurrentUser({
        ...staff,
        type: 'STAFF',
        user: staff.username,
        pass: staff.password,
      });
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans p-6">
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
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'dark-theme' : ''} bg-slate-50 font-sans text-slate-800 pb-20 leading-normal transition-colors duration-200`}>
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
                <>
                  {/* ADMIN TOP: 50/50 Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 h-full flex flex-col transition-colors duration-200 text-left">
                      <h2 className="text-lg font-bold mb-4 flex items-center gap-2 uppercase border-b border-slate-200 pb-3 transition-colors duration-200 text-slate-900">
                        {t('Approvals')}{' '}
                        <AlertCircle className="text-amber-500" size={16} />
                      </h2>
                      <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar">
                        {leaveApps.filter((a) => a.status === 'PENDING')
                          .length === 0 ? (
                          <div className="text-center py-16 text-slate-400 font-bold uppercase text-[10px]">
                            {t('No pending requests.')}
                          </div>
                        ) : (
                          leaveApps
                            .filter((a) => a.status === 'PENDING')
                            .map((app) => (
                              <div
                                key={app.id}
                                className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-indigo-400 transition flex flex-col gap-3 transition-colors duration-200 text-left"
                              >
                                <div className="space-y-1">
                                  <p className="font-bold text-slate-800 uppercase text-[9px]">
                                    {app.staffName} ·{' '}
                                    {t(getTypeFullName(app.type))}
                                  </p>
                                  <p className="text-xs font-bold text-indigo-600">
                                    {app.type === 'PROFILE_UPDATE'
                                      ? t('Requested Changes to Staff Data')
                                      : app.type === 'PH_UPDATE'
                                      ? `${t('PH Selection')} (${app.days} items)`
                                      : app.type === 'PH_CONVERT_BATCH'
                                      ? `${t('Convert')} ${app.days} ${t('Holidays to RL')}`
                                      : `${app.startDate} to ${app.endDate} (${app.days}d)`}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() =>
                                      processLeave(app.id, 'APPROVED')
                                    }
                                    className="flex-1 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition shadow active:scale-95 flex items-center justify-center"
                                  >
                                    <Check size={16} />
                                  </button>
                                  <button
                                    onClick={() => {
                                      setRejectPromptId(app.id);
                                      setRejectReason('');
                                    }}
                                    className="flex-1 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition shadow active:scale-95 flex items-center justify-center"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              </div>
                            ))
                        )}
                      </div>
                    </div>
                    {/* Admin Status Balances Card (Vertical list) */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 h-full flex flex-col transition-colors duration-200 text-left">
                      <h2 className="text-lg font-bold text-slate-400 uppercase mb-6 border-b border-slate-200 pb-4 flex items-center justify-between transition-colors duration-200 text-left">
                        {t('Status Balances')}{' '}
                        <Info size={14} className="text-slate-300" />
                      </h2>
                      <div className="flex flex-col gap-6 flex-1 justify-center text-left">
                        <BalanceMetric
                          label={t("Annual Leave")}
                          current={earnedAL - activeStaff.alUsed}
                          total={earnedAL}
                          color="indigo"
                          onInfoClick={() => setViewLeaveHistory('AL')}
                        />
                        <BalanceMetric
                          label={t("Medical Leave")}
                          current={14 - activeStaff.mcUsed}
                          total={14}
                          color="emerald"
                          onInfoClick={() => setViewLeaveHistory('MC')}
                        />
                        <BalanceMetric
                          label={t("Public Holiday")}
                          current={6 - (activeStaff.phUsed || 0)}
                          total={6}
                          color="amber"
                          onInfoClick={() => setViewLeaveHistory('PH')}
                        />
                        <BalanceMetric
                          label={t("Unpaid Leave")}
                          current={activeStaff.uplUsed}
                          total={null}
                          color="rose"
                          onInfoClick={() => setViewLeaveHistory('UPL')}
                        />
                        <BalanceMetric
                          label={t("Replacement")}
                          current={activeStaff.rlUsed || 0}
                          total={activeStaff.rlEarned || 0}
                          color="teal"
                          onInfoClick={() => setViewLeaveHistory('RL')}
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* STAFF TOP: Full Width Horizontal Bar */}
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
                        if (!start || !end) return alert('Dates are required.');
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
                        {optionalPHs.map((ph) => (
                          <div
                            key={ph.id}
                            className="flex items-center justify-between p-2.5 rounded-lg border bg-slate-50 border-slate-100 hover:bg-slate-100 transition transition-colors duration-200 text-left"
                          >
                            <label className="flex items-center gap-3 flex-1 cursor-pointer text-left">
                              <input
                                type="checkbox"
                                checked={draftPHs.includes(ph.id)}
                                disabled={activeStaff.convertedPHs?.includes(
                                  ph.id
                                )}
                                onChange={(e) =>
                                  handleDraftTogglePH(ph.id, e.target.checked)
                                }
                                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                                style={{ backgroundColor: '#ffffff' }}
                              />
                              <div className="text-left">
                                <p className="text-[11px] font-bold text-slate-800 text-left">
                                  {t(ph.name)} <span className="font-normal text-slate-500 ml-1">({ph.date})</span>
                                </p>
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-4 text-left">
                        <button
                          onClick={submitPHSelection}
                          className="flex-1 bg-indigo-600 text-white py-3 rounded-xl text-xs font-bold uppercase shadow-sm"
                        >
                          {t('Apply')}
                        </button>
                        <button
                          onClick={triggerBatchConvert}
                          className="flex-1 bg-teal-500 text-white py-3 rounded-xl text-xs font-bold uppercase shadow-sm"
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
                        <BalanceMetric
                          label={t("Annual Leave")}
                          current={earnedAL - activeStaff.alUsed}
                          total={earnedAL}
                          color="indigo"
                          onInfoClick={() => setViewLeaveHistory('AL')}
                        />
                        <BalanceMetric
                          label={t("Medical Leave")}
                          current={14 - activeStaff.mcUsed}
                          total={14}
                          color="emerald"
                          onInfoClick={() => setViewLeaveHistory('MC')}
                        />
                        <BalanceMetric
                          label={t("Public Holiday")}
                          current={6 - (activeStaff.phUsed || 0)}
                          total={6}
                          color="amber"
                          onInfoClick={() => setViewLeaveHistory('PH')}
                        />
                        <BalanceMetric
                          label={t("Unpaid Leave")}
                          current={activeStaff.uplUsed}
                          total={null}
                          color="rose"
                          onInfoClick={() => setViewLeaveHistory('UPL')}
                        />
                        <BalanceMetric
                          label={t("Replacement")}
                          current={activeStaff.rlUsed || 0}
                          total={activeStaff.rlEarned || 0}
                          color="teal"
                          onInfoClick={() => setViewLeaveHistory('RL')}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Action History (Bottom Full Width) */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 transition-colors duration-200 text-left">
                <h3 className="text-lg font-bold mb-6 uppercase border-b border-slate-200 pb-4 flex items-center justify-between transition-colors duration-200 text-left">
                  {t('Action History')}{' '}
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
                            <span className="text-sm font-bold text-slate-400 uppercase text-left">
                              -{dateGroup}-
                            </span>
                            <div className="h-px bg-slate-200 flex-1 transition-colors duration-200" />
                          </div>
                          <div className="space-y-4 text-left">
                            {groupedActionLogs[dateGroup].map((log) => (
                              <div
                                key={log.id}
                                onClick={() =>
                                  currentUser.type === 'STAFF' &&
                                  log.status === 'PENDING' &&
                                  log.type !== 'SYSTEM_AL_PROBATION' &&
                                  setCancelPromptApp(log)
                                }
                                className="p-5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col transition relative group transition-colors duration-200 hover:border-slate-300 cursor-pointer text-left"
                              >
                                <div className="flex items-start justify-between mb-2 text-left">
                                  <div className="flex gap-3 items-center text-left">
                                    <div
                                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                                        [
                                          'AL',
                                          'SYSTEM_AL_PROBATION',
                                          'PROFILE_UPDATE',
                                        ].includes(log.type)
                                          ? 'bg-indigo-400'
                                          : log.type === 'MC'
                                          ? 'bg-emerald-400'
                                          : log.type === 'RL'
                                          ? 'bg-teal-400'
                                          : 'bg-amber-400'
                                      }`}
                                    />
                                    <p
                                      className={`font-bold text-xs uppercase text-left ${
                                        log.status === 'CANCELLED'
                                          ? 'text-slate-400 line-through'
                                          : 'text-slate-800'
                                      }`}
                                    >
                                      {t(getTypeFullName(log.type))} {t('Request')}
                                    </p>
                                  </div>
                                  <span className="shrink-0 px-2 py-1 rounded text-[8px] font-bold border transition-colors duration-200 text-left">
                                    {t(log.status)}
                                  </span>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center mt-3 pt-3 border-t border-slate-200/60 gap-2 justify-between transition-colors duration-200 text-left">
                                  <div className="text-[10px] font-bold text-indigo-600 text-left">
                                    {log.startDate
                                      ? `${log.startDate} to ${log.endDate}`
                                      : ''}
                                  </div>
                                  <div className="text-[9px] text-slate-400 font-bold uppercase ml-auto text-left">
                                    {t('Applied Date :')}{' '}
                                    {new Date(
                                      log.appliedAt || log.id
                                    ).toLocaleDateString('en-GB')}
                                    ,{' '}
                                    {new Date(
                                      log.appliedAt || log.id
                                    ).toLocaleTimeString('en-US', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
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
                  <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-4 transition-colors duration-200 text-left">
                    <h2 className="text-lg font-bold text-white flex items-center gap-3 text-left">
                      <Wallet className="text-indigo-400" /> {t('Payroll Engine')}
                    </h2>
                    <select
                      className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-bold text-white outline-none transition-colors duration-200"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                      {MONTHS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
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
                        className="w-full bg-indigo-500 text-white py-3 rounded-lg font-bold text-sm uppercase text-left text-center"
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
                  <h2 className="text-lg font-bold mb-6 uppercase border-b border-slate-100 pb-4 transition-colors duration-200 text-left">
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
                    alert(t('Cancelled.'));
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
            <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar text-left">
              {leaveApps.filter(
                (a) =>
                  a.staffId === activeStaff.id &&
                  a.type === viewLeaveHistory &&
                  a.status === 'APPROVED'
              ).length === 0 ? (
                <div className="text-center text-xs font-bold text-slate-400 py-12 uppercase text-left">
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

      {/* INJECTED GLOBAL STYLES FOR DARK MODE OVERRIDE */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Inter', system-ui, sans-serif !important; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        
        /* Dark Theme Variables / Overrides */
        .dark-theme {
          background-color: #0f172a !important; /* bg-slate-900 */
          color: #f8fafc !important; /* text-slate-50 */
        }
        .dark-theme header {
          background-color: #1e293b !important;
          border-color: #334155 !important;
        }
        .dark-theme .bg-white, .dark-theme .bg-slate-50 {
          background-color: #1e293b !important; /* bg-slate-800 */
          border-color: #334155 !important; /* border-slate-700 */
        }
        .dark-theme .bg-slate-100 {
          background-color: #334155 !important;
        }
        /* Specific forced colors for daylight that invert in dark mode */
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
        /* Preserve specific dark blocks */
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
      `}</style>
    </div>
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