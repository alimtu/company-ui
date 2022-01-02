import { Component } from "react";

class Words extends Component {
  static app_name = "سینترا";
  static app_company = "فولاد بهمن";
  static unhandled_exception = "خطایی در سامانه رخ داده است";
  static copyright =
    "تمامی حقوق این سامانه متعلق به گروه صنعتی فولاد بهمن می باشد";
  static main_menu = "منوی اصلی";
  static search = "جستجو";
  static clear = "پاکسازی";
  static reload = "بارگذاری مجدد";
  static new = "جدید";
  static edit = "ویرایش";
  static delete = "حذف";
  static newInfo = "ثبت اطلاعات";
  static editInfo = "ویرایش اطلاعات";
  static submit = "ثبت";
  static search_text = "متن جستجو";
  static empty_data = "اطلاعاتی برای نمایش وجود ندارد";
  static id = "شناسه";
  static title = "عنوان";
  static yes = "بله";
  static no = "خیر";
  static ok = "اعمال";
  static cancel = "انصراف";
  static excel = "اکسل";
  static view_all = "نمایش همه";
  static username = "نام کاربری";
  static password = "رمز عبور";
  static login_to_app = "ورود به سامانه";
  static logout = "خروج";
  static status = "وضعیت";
  static active = "فعال";
  static inactive = "غیرفعال";
  static accesses = "دسترسی ها";
  static can_add = "امکان ثبت";
  static can_edit = "امکان ویرایش";
  static can_delete = "امکان حذف";
  static can_view = "امکان مشاهده";
  static role = "سمت";
  static roles = "سمت ها";
  static close = "بستن";
  static hour = "ساعت";
  static privillage = "مجوز";
  static download = "دانلود";
  static view_image = "مشاهده تصویر";
  static reg_date = "تاریخ ثبت";
  static reg_time = "زمان ثبت";
  static first_name = "نام";
  static last_name = "نام خانوادگی";
  static reg_date_time = "زمان ثبت";
  static full_name = "نام و نام خانوادگی";
  static member_id = "شناسه کاربر";
  static national_code = "کد ملی";
  static mobile = "موبایل";
  static account_status = "وضعیت حساب کاربری";
  static gender = "جنسیت";
  static male = "آقا";
  static female = "خانم";
  static male_female = "خانم/آقا";
  static active_inactive = "فعال/غیرفعال";
  static person = "نفر";
  static radif = "ردیف";
  static from_date = "از تاریخ";
  static to_date = "تا تاریخ";
  static from = "از";
  static to = "تا";
  static type = "نوع";
  static percent = "درصد";
  static save_settings = "ذخیره تنظیمات";
  static search_text = "متن جستجو";
  static clear = "پاکسازی";
  static view_all = "نمایش همه";
  static excel = "اکسل";
  static new = "جدید";
  static select_please = "انتخاب کنید";
  static parent_department = "دپارتمان والد";
  static office_tel = "تلفن ثابت";
  static fax = "فکس";
  static address = "آدرس";
  static postal_code = "کدپستی";
  static national_id = "شناسه ملی";
  static financial_code = "کد اقتصادی";
  static reg_no = "شماره ثبت";
  static more_details = "جزئیات بیشتر";
  static confirm = "تایید";
  static fix_tel = "تلفن ثابت";
  static birth_date = "تاریخ تولد";
  static profile_image = "تصویر پروفایل";
  static reg_member = "ثبت کننده";
  static attached_file = "فایل پیوست";
  static select_file = "انتخاب فایل";
  static max_file_size = "حداکثر ظرفیت فایل جهت آپلود یک مگابایت می باشد";
  static max_file_size_1 = "حداکثر ظرفیت فایل آپلود ";
  static max_file_size_2_mb = " مگابایت می باشد";
  static max_file_size_2_kb = " کیلوبایت می باشد";
  static limit_upload_file_size =
    "حجم فایل شما بیشتر از مقدار تعیین شده می باشد";
  static department_manager = "مدیر دپارتمان";
  static descriptions = "توضیحات";
  static generate_random_account_info = "تولید نام کاربری و رمز عبور تصادفی";
  static color_code = "کد رنگ";
  static color_id = "شناسه رنگ";
  static show_order = "ترتیب نمایش";
  static move_up = "انتقال به بالا";
  static move_down = "انتقال به پایین";
  static duty_title = "عنوان وظیفه";
  static remove_image = "حذف تصویر";
  static reload_image = "بازیابی تصویر";
  static invalid_national_code = "کدملی نامعتبر";
  static settings = "تنظیمات سامانه";
  static basic_settings = "اطلاعات پایه";
  static nafar = "نفر";
  static no_employee = "بدون کارمند!";
  static no_department_manager = "بدون مدیر دپارتمان!";
  static vacation_format = "قالب مرخصی";
  static mission_format = "قالب ماموریت";
  static by_day = "روزانه";
  static by_hour = "ساعتی";
  static submit_crop = "ثبت تصویر برش داده شده";
  static new_image = "تصویر جدید";
  static past_image = "تصویر قبلی";
  static re_cut = "برش مجدد";
  static please_wait = "لطفا صبر کنید ...";
  static please_wait_for_load_image = "لطفا تا بارگذاری تصویر شکیبا باشید ...";
  static visit_profile = "مشاهده حساب کاربری";
  static logout_from_account = "خروج از حساب کاربری";
  static date = "تاریخ";
  static time = "زمان";
  static holiday_date = "تاریخ تعطیلی";
  static can_add = "امکان ثبت";
  static can_edit = "امکان ویرایش";
  static can_delete = "امکان حذف";
  static can_view = "امکان مشاهده";
  static back = "بازگشت";

  static dashboard = "داشبورد";
  //-----------------------------

  static success_load_graph = "چارت سازمانی با موفقیت بارگذاری شد";

  //--------------------------------
  //----
  static official = "اداری";
  //----
  static org_structure = "ساختار سازمانی";
  static departments = "دپارتمان ها";
  static department = "دپارتمان";
  static roles = "سمت ها";
  static role = "سمت";
  static companies = "شرکت ها";
  static company = "شرکت";
  static members = "کاربران";
  static member = "کاربر";
  static employees = "کارکنان";
  static employee = "کارمند";
  static company_agents = "رابطین شرکت ها";
  static company_agent = "رابط شرکت";
  static comp_agents = "رابطین شرکت";
  static duty_levels = "سطوح وظایف";
  static duties = "شرح وظایف";
  static personal_duties = "شرح وظایف فردی";
  static role_duties = "شرح وظایف سمت";
  static duty_level = "سطح وظیفه";
  //---
  static provinces = "استان ها";
  static province = "استان";
  static cities = "شهرها";
  static city = "شهر";
  //---
  static security_guards = "نگهبان ها";
  static security_guard = "نگهبان";
  //---
  static timex = "تایمکس";
  static timex_settings = "تنظیمات تایمکس";
  static security = "امنیت";
  static indexes = "شاخص ها";
  static vacations = "مرخصی ها";
  static missions = "ماموریت ها";
  static work_time_info = "اطلاعات تردد";
  static reports = "گزارش ها";
  //---
  static vacation_types = "انواع مرخصی";
  static mission_types = "انواع ماموریت";
  static holidays = "تعطیلات";
  //---
  static page_accesses = "دسترسی صفحات";

  //---
  static automation = "اتوماسیون اداری";
  //---

  static messages = {
    operation_failed: "امکان انجام عملیات وجود ندارد",
    success_submit: "ثبت اطلاعات با موفقیت انجام شد",
    no_national_code: "کدملی وارد نشده است",
    page_not_found: "صفحه مورد درخواست شما یافت نشد",
    invalid_access_page: "متاسفانه مجاز به دیدن این صفحه نمی باشید",
  };

  static questions = {
    sure_to_logout: "برای خروج از سامانه اطمینان دارید؟",
    sure_to_delete_item: "برای حرف رکورد انتخابی اطمینان دارید؟",
    sure_to_delete_image: "برای حذف تصویر اطمینان دارید؟",
  };

  static monthes = {
    farvardin: "فروردین",
    ordibehesht: "اردیبهشت",
    khordad: "خرداد",
    //---
    tir: "تیر",
    mordad: "مرداد",
    shahrivar: "شهریور",
    //---
    mehr: "مهر",
    aban: "آبان",
    azar: "آذر",
    //---
    dey: "دی",
    bahman: "بهمن",
    esfand: "اسفند",
  };
}

export default Words;
