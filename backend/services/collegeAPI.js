import axios from 'axios';

// Comprehensive college database with 50+ colleges across all streams
const mockCollegesDatabase = {
  // ENGINEERING CAREERS
  cs_engineering: [
    { id: 'iit_delhi_cs', name: 'IIT Delhi', course: 'B.Tech Computer Science Engineering', duration: '4 years', fees: { total: 800000, perYear: 200000, currency: 'INR' }, applicationOpenDate: '2025-11-01', applicationCloseDate: '2025-12-04', applicationLink: 'https://www.iitd.ac.in/admissions', eligibility: 95, minMarksPercentage: 75, jeeRankCutoff: 2000, requiresJEE: true, location: 'New Delhi, India' },
    { id: 'iit_bombay_cs', name: 'IIT Bombay', course: 'B.Tech Computer Science Engineering', duration: '4 years', fees: { total: 850000, perYear: 212500, currency: 'INR' }, applicationOpenDate: '2025-11-01', applicationCloseDate: '2025-12-04', applicationLink: 'https://www.iitb.ac.in/admissions', eligibility: 94, minMarksPercentage: 75, jeeRankCutoff: 1500, requiresJEE: true, location: 'Mumbai, India' },
    { id: 'iit_madras_cs', name: 'IIT Madras', course: 'B.Tech Computer Science Engineering', duration: '4 years', fees: { total: 750000, perYear: 187500, currency: 'INR' }, applicationOpenDate: '2025-11-01', applicationCloseDate: '2025-12-04', applicationLink: 'https://www.iitm.ac.in/admissions', eligibility: 93, minMarksPercentage: 75, jeeRankCutoff: 2500, requiresJEE: true, location: 'Chennai, India' },
    { id: 'nit_trichy_cs', name: 'NIT Trichy', course: 'B.Tech Computer Science Engineering', duration: '4 years', fees: { total: 600000, perYear: 150000, currency: 'INR' }, applicationOpenDate: '2025-11-15', applicationCloseDate: '2026-04-15', applicationLink: 'https://www.nitt.edu/admissions', eligibility: 92, minMarksPercentage: 75, jeeRankCutoff: 8000, requiresJEE: true, location: 'Tiruchirappalli, India' },
    { id: 'bits_pilani_cs', name: 'BITS Pilani', course: 'B.E. Computer Science', duration: '4 years', fees: { total: 1200000, perYear: 300000, currency: 'INR' }, applicationOpenDate: '2025-01-15', applicationCloseDate: '2026-04-15', applicationLink: 'https://www.bitsadmission.com', eligibility: 91, minMarksPercentage: 75, jeeRankCutoff: 10000, requiresJEE: false, location: 'Pilani, India' },
    { id: 'vit_vellore_cs', name: 'VIT Vellore', course: 'B.Tech Computer Science Engineering', duration: '4 years', fees: { total: 1400000, perYear: 350000, currency: 'INR' }, applicationOpenDate: '2025-11-01', applicationCloseDate: '2026-05-31', applicationLink: 'https://vit.ac.in/admissions', eligibility: 91, minMarksPercentage: 60, jeeRankCutoff: null, requiresJEE: false, location: 'Vellore, India' },
    { id: 'pes_bangalore_cs', name: 'PES University', course: 'B.Tech Computer Science Engineering', duration: '4 years', fees: { total: 1200000, perYear: 300000, currency: 'INR' }, applicationOpenDate: '2026-02-01', applicationCloseDate: '2026-06-30', applicationLink: 'https://www.pes.edu/admissions', eligibility: 90, minMarksPercentage: 60, jeeRankCutoff: null, requiresJEE: false, location: 'Bangalore, India' },
    { id: 'iiit_hyderabad_cs', name: 'IIIT Hyderabad', course: 'B.Tech Computer Science Engineering', duration: '4 years', fees: { total: 900000, perYear: 225000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-04-30', applicationLink: 'https://www.iiit.ac.in/admissions', eligibility: 92, minMarksPercentage: 75, jeeRankCutoff: 5000, requiresJEE: true, location: 'Hyderabad, India' },
    { id: 'nit_warangal_cs', name: 'NIT Warangal', course: 'B.Tech Computer Science Engineering', duration: '4 years', fees: { total: 600000, perYear: 150000, currency: 'INR' }, applicationOpenDate: '2024-01-15', applicationCloseDate: '2024-04-15', applicationLink: 'https://www.nitw.ac.in/admissions', eligibility: 91, minMarksPercentage: 75, jeeRankCutoff: 10000, requiresJEE: true, location: 'Warangal, India' },
    { id: 'nit_surathkal_cs', name: 'NIT Surathkal', course: 'B.Tech Computer Science Engineering', duration: '4 years', fees: { total: 600000, perYear: 150000, currency: 'INR' }, applicationOpenDate: '2024-01-15', applicationCloseDate: '2024-04-15', applicationLink: 'https://www.nitk.ac.in/admissions', eligibility: 90, minMarksPercentage: 75, jeeRankCutoff: 12000, requiresJEE: true, location: 'Surathkal, India' },
  ],

  // COMMERCE/ACCOUNTS CAREERS
  chartered_accountancy: [
    { id: 'icai_delhi', name: 'ICAI - New Delhi', course: 'Chartered Accountancy (CA)', duration: '3-5 years', fees: { total: 150000, perYear: 50000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-12-31', applicationLink: 'https://www.icai.org', eligibility: 90, minMarksPercentage: 50, jeeRankCutoff: null, requiresJEE: false, location: 'New Delhi, India' },
    { id: 'icai_mumbai', name: 'ICAI - Mumbai', course: 'Chartered Accountancy (CA)', duration: '3-5 years', fees: { total: 150000, perYear: 50000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-12-31', applicationLink: 'https://www.icai.org', eligibility: 90, location: 'Mumbai, India' },
    { id: 'icai_chennai', name: 'ICAI - Chennai', course: 'Chartered Accountancy (CA)', duration: '3-5 years', fees: { total: 150000, perYear: 50000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-12-31', applicationLink: 'https://www.icai.org', eligibility: 90, location: 'Chennai, India' },
    { id: 'icai_kolkata', name: 'ICAI - Kolkata', course: 'Chartered Accountancy (CA)', duration: '3-5 years', fees: { total: 150000, perYear: 50000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-12-31', applicationLink: 'https://www.icai.org', eligibility: 90, location: 'Kolkata, India' },
    { id: 'icai_bangalore', name: 'ICAI - Bangalore', course: 'Chartered Accountancy (CA)', duration: '3-5 years', fees: { total: 150000, perYear: 50000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-12-31', applicationLink: 'https://www.icai.org', eligibility: 90, location: 'Bangalore, India' },
  ],

  bcom_accounting: [
    { id: 'sri_ram_college_bcom', name: 'Sri Ram College of Commerce', course: 'B.Com (Hons)', duration: '3 years', fees: { total: 45000, perYear: 15000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://www.srcc.edu', eligibility: 95, minMarksPercentage: 95, jeeRankCutoff: null, requiresJEE: false, location: 'New Delhi, India' },
    { id: 'loyola_college_bcom', name: 'Loyola College', course: 'B.Com', duration: '3 years', fees: { total: 60000, perYear: 20000, currency: 'INR' }, applicationOpenDate: '2024-04-01', applicationCloseDate: '2024-05-31', applicationLink: 'https://www.loyolacollege.edu', eligibility: 94, minMarksPercentage: 90, jeeRankCutoff: null, requiresJEE: false, location: 'Chennai, India' },
    { id: 'christ_university_bcom', name: 'Christ University', course: 'B.Com', duration: '3 years', fees: { total: 180000, perYear: 60000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.christuniversity.in', eligibility: 93, minMarksPercentage: 85, jeeRankCutoff: null, requiresJEE: false, location: 'Bangalore, India' },
    { id: 'st_xaviers_mumbai_bcom', name: 'St. Xavier\'s College Mumbai', course: 'B.Com', duration: '3 years', fees: { total: 75000, perYear: 25000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-15', applicationLink: 'https://www.xaviers.edu', eligibility: 92, minMarksPercentage: 85, jeeRankCutoff: null, requiresJEE: false, location: 'Mumbai, India' },
    { id: 'presidency_college_bcom', name: 'Presidency College', course: 'B.Com', duration: '3 years', fees: { total: 30000, perYear: 10000, currency: 'INR' }, applicationOpenDate: '2024-04-15', applicationCloseDate: '2024-05-31', applicationLink: 'https://www.presidencycollege.ac.in', eligibility: 91, minMarksPercentage: 80, jeeRankCutoff: null, requiresJEE: false, location: 'Chennai, India' },
    { id: 'hansraj_college_bcom', name: 'Hansraj College', course: 'B.Com (Hons)', duration: '3 years', fees: { total: 42000, perYear: 14000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://www.hansrajcollege.ac.in', eligibility: 92, minMarksPercentage: 85, jeeRankCutoff: null, requiresJEE: false, location: 'New Delhi, India' },
    { id: 'ramjas_college_bcom', name: 'Ramjas College', course: 'B.Com', duration: '3 years', fees: { total: 36000, perYear: 12000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://www.ramjas.du.ac.in', eligibility: 91, minMarksPercentage: 80, jeeRankCutoff: null, requiresJEE: false, location: 'New Delhi, India' },
    { id: 'madras_christian_bcom', name: 'Madras Christian College', course: 'B.Com', duration: '3 years', fees: { total: 54000, perYear: 18000, currency: 'INR' }, applicationOpenDate: '2024-04-01', applicationCloseDate: '2024-05-31', applicationLink: 'https://www.mcc.edu.in', eligibility: 90, minMarksPercentage: 75, jeeRankCutoff: null, requiresJEE: false, location: 'Chennai, India' },
  ],

  mba_finance: [
    { id: 'iim_ahmedabad_finance', name: 'IIM Ahmedabad', course: 'MBA Finance', duration: '2 years', fees: { total: 2500000, perYear: 1250000, currency: 'INR' }, applicationOpenDate: '2024-08-01', applicationCloseDate: '2024-11-30', applicationLink: 'https://www.iima.ac.in/admissions', eligibility: 96, minMarksPercentage: 50, catScoreCutoff: 99, requiresCAT: true, location: 'Ahmedabad, India' },
    { id: 'iim_bangalore_finance', name: 'IIM Bangalore', course: 'MBA Finance', duration: '2 years', fees: { total: 2400000, perYear: 1200000, currency: 'INR' }, applicationOpenDate: '2024-08-01', applicationCloseDate: '2024-11-30', applicationLink: 'https://www.iimb.ac.in/admissions', eligibility: 95, minMarksPercentage: 50, catScoreCutoff: 98, requiresCAT: true, location: 'Bangalore, India' },
    { id: 'iim_calcutta_finance', name: 'IIM Calcutta', course: 'MBA Finance', duration: '2 years', fees: { total: 2300000, perYear: 1150000, currency: 'INR' }, applicationOpenDate: '2024-08-01', applicationCloseDate: '2024-11-30', applicationLink: 'https://www.iimcal.ac.in/admissions', eligibility: 94, minMarksPercentage: 50, catScoreCutoff: 97, requiresCAT: true, location: 'Kolkata, India' },
    { id: 'xlri_finance', name: 'XLRI Jamshedpur', course: 'MBA Finance', duration: '2 years', fees: { total: 2200000, perYear: 1100000, currency: 'INR' }, applicationOpenDate: '2024-07-01', applicationCloseDate: '2024-12-31', applicationLink: 'https://www.xlri.ac.in/admissions', eligibility: 93, minMarksPercentage: 50, catScoreCutoff: 95, requiresCAT: true, location: 'Jamshedpur, India' },
    { id: 'fms_delhi_finance', name: 'FMS Delhi', course: 'MBA Finance', duration: '2 years', fees: { total: 400000, perYear: 200000, currency: 'INR' }, applicationOpenDate: '2024-08-01', applicationCloseDate: '2024-11-30', applicationLink: 'https://www.fms.edu/admissions', eligibility: 92, minMarksPercentage: 50, catScoreCutoff: 96, requiresCAT: true, location: 'New Delhi, India' },
    { id: 'iim_lucknow_finance', name: 'IIM Lucknow', course: 'MBA Finance', duration: '2 years', fees: { total: 1900000, perYear: 950000, currency: 'INR' }, applicationOpenDate: '2024-08-01', applicationCloseDate: '2024-11-30', applicationLink: 'https://www.iiml.ac.in/admissions', eligibility: 93, minMarksPercentage: 50, catScoreCutoff: 94, requiresCAT: true, location: 'Lucknow, India' },
    { id: 'iim_kozhikode_finance', name: 'IIM Kozhikode', course: 'MBA Finance', duration: '2 years', fees: { total: 1800000, perYear: 900000, currency: 'INR' }, applicationOpenDate: '2024-08-01', applicationCloseDate: '2024-11-30', applicationLink: 'https://www.iimk.ac.in/admissions', eligibility: 92, minMarksPercentage: 50, catScoreCutoff: 92, requiresCAT: true, location: 'Kozhikode, India' },
    { id: 'nmims_mumbai_finance', name: 'NMIMS Mumbai', course: 'MBA Finance', duration: '2 years', fees: { total: 2000000, perYear: 1000000, currency: 'INR' }, applicationOpenDate: '2024-01-15', applicationCloseDate: '2024-06-15', applicationLink: 'https://www.nmims.edu/admissions', eligibility: 91, minMarksPercentage: 50, matScoreCutoff: 650, requiresMAT: true, location: 'Mumbai, India' },
  ],

  bba_business: [
    { id: 'nmims_mumbai_bba', name: 'NMIMS Mumbai', course: 'BBA', duration: '3 years', fees: { total: 1400000, perYear: 466667, currency: 'INR' }, applicationOpenDate: '2024-01-15', applicationCloseDate: '2024-06-15', applicationLink: 'https://www.nmims.edu/admissions', eligibility: 92, location: 'Mumbai, India' },
    { id: 'shaheed_sukhdev_bba', name: 'Shaheed Sukhdev College', course: 'BMS', duration: '3 years', fees: { total: 180000, perYear: 60000, currency: 'INR' }, applicationOpenDate: '2024-03-01', applicationCloseDate: '2024-05-15', applicationLink: 'https://sscbs.du.ac.in/admissions', eligibility: 91, location: 'New Delhi, India' },
    { id: 'christ_university_bba', name: 'Christ University', course: 'BBA', duration: '3 years', fees: { total: 450000, perYear: 150000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.christuniversity.in', eligibility: 93, location: 'Bangalore, India' },
    { id: 'symbiosis_pune_bba', name: 'Symbiosis International University', course: 'BBA', duration: '3 years', fees: { total: 600000, perYear: 200000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-04-30', applicationLink: 'https://www.siu.edu.in/admissions', eligibility: 92, location: 'Pune, India' },
    { id: 'nmims_bangalore_bba', name: 'NMIMS Bangalore', course: 'BBA', duration: '3 years', fees: { total: 1200000, perYear: 400000, currency: 'INR' }, applicationOpenDate: '2024-01-15', applicationCloseDate: '2024-06-15', applicationLink: 'https://www.nmims.edu/admissions', eligibility: 91, location: 'Bangalore, India' },
    { id: 'jain_university_bba', name: 'Jain University', course: 'BBA', duration: '3 years', fees: { total: 450000, perYear: 150000, currency: 'INR' }, applicationOpenDate: '2024-02-01', applicationCloseDate: '2024-05-31', applicationLink: 'https://www.jainuniversity.ac.in/admissions', eligibility: 90, location: 'Bangalore, India' },
  ],

  // MEDICAL CAREERS
  mbbs_medicine: [
    { id: 'aiims_delhi_mbbs', name: 'AIIMS New Delhi', course: 'MBBS', duration: '5.5 years', fees: { total: 55000, perYear: 10000, currency: 'INR' }, applicationOpenDate: '2024-03-01', applicationCloseDate: '2024-04-30', applicationLink: 'https://www.aiims.edu/en/admissions', eligibility: 98, minMarksPercentage: 60, neetRankCutoff: 100, requiresNEET: true, location: 'New Delhi, India' },
    { id: 'aiims_jodhpur_mbbs', name: 'AIIMS Jodhpur', course: 'MBBS', duration: '5.5 years', fees: { total: 55000, perYear: 10000, currency: 'INR' }, applicationOpenDate: '2024-03-01', applicationCloseDate: '2024-04-30', applicationLink: 'https://www.aiimsjodhpur.edu.in/admissions', eligibility: 97, minMarksPercentage: 60, neetRankCutoff: 500, requiresNEET: true, location: 'Jodhpur, India' },
    { id: 'aiims_bhubaneswar_mbbs', name: 'AIIMS Bhubaneswar', course: 'MBBS', duration: '5.5 years', fees: { total: 55000, perYear: 10000, currency: 'INR' }, applicationOpenDate: '2024-03-01', applicationCloseDate: '2024-04-30', applicationLink: 'https://www.aiimsbhubaneswar.edu.in/admissions', eligibility: 96, minMarksPercentage: 60, neetRankCutoff: 1000, requiresNEET: true, location: 'Bhubaneswar, India' },
    { id: 'kgmc_lucknow_mbbs', name: 'King George\'s Medical University', course: 'MBBS', duration: '5.5 years', fees: { total: 165000, perYear: 30000, currency: 'INR' }, applicationOpenDate: '2024-04-01', applicationCloseDate: '2024-05-31', applicationLink: 'https://www.kgmu.org/admissions', eligibility: 95, minMarksPercentage: 50, neetRankCutoff: 5000, requiresNEET: true, location: 'Lucknow, India' },
    { id: 'jipmer_puducherry_mbbs', name: 'JIPMER Puducherry', course: 'MBBS', duration: '5.5 years', fees: { total: 55000, perYear: 10000, currency: 'INR' }, applicationOpenDate: '2024-03-01', applicationCloseDate: '2024-04-30', applicationLink: 'https://www.jipmer.edu.in/admissions', eligibility: 96, minMarksPercentage: 60, neetRankCutoff: 800, requiresNEET: true, location: 'Puducherry, India' },
    { id: 'maulana_azad_mbbs', name: 'Maulana Azad Medical College', course: 'MBBS', duration: '5.5 years', fees: { total: 110000, perYear: 20000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://www.mamc.ac.in/admissions', eligibility: 95, minMarksPercentage: 50, neetRankCutoff: 3000, requiresNEET: true, location: 'New Delhi, India' },
    { id: 'grant_medical_mbbs', name: 'Grant Medical College', course: 'MBBS', duration: '5.5 years', fees: { total: 110000, perYear: 20000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://www.grantmedicalcollege.edu.in/admissions', eligibility: 94, minMarksPercentage: 50, neetRankCutoff: 5000, requiresNEET: true, location: 'Mumbai, India' },
    { id: 'stanley_medical_mbbs', name: 'Stanley Medical College', course: 'MBBS', duration: '5.5 years', fees: { total: 110000, perYear: 20000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://www.stanleymedicalcollege.edu.in/admissions', eligibility: 94, minMarksPercentage: 50, neetRankCutoff: 6000, requiresNEET: true, location: 'Chennai, India' },
    { id: 'christian_medical_vellore_mbbs', name: 'Christian Medical College Vellore', course: 'MBBS', duration: '5.5 years', fees: { total: 330000, perYear: 60000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-02-28', applicationLink: 'https://www.cmch-vellore.edu/admissions', eligibility: 96, minMarksPercentage: 60, neetRankCutoff: 2000, requiresNEET: true, location: 'Vellore, India' },
    { id: 'afmc_pune_mbbs', name: 'Armed Forces Medical College', course: 'MBBS', duration: '5.5 years', fees: { total: 55000, perYear: 10000, currency: 'INR' }, applicationOpenDate: '2024-02-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.afmc.nic.in/admissions', eligibility: 97, minMarksPercentage: 60, neetRankCutoff: 300, requiresNEET: true, location: 'Pune, India' },
  ],

  bds_dental: [
    { id: 'manipal_dental', name: 'Manipal College of Dental Sciences', course: 'BDS', duration: '5 years', fees: { total: 2500000, perYear: 500000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.manipal.edu/admissions', eligibility: 92, location: 'Manipal, India' },
    { id: 'sri_ramachandra_dental', name: 'Sri Ramachandra Dental College', course: 'BDS', duration: '5 years', fees: { total: 2000000, perYear: 400000, currency: 'INR' }, applicationOpenDate: '2024-02-01', applicationCloseDate: '2024-04-30', applicationLink: 'https://www.sriramachandra.edu.in/admissions', eligibility: 91, location: 'Chennai, India' },
    { id: 'srm_dental', name: 'SRM Dental College', course: 'BDS', duration: '5 years', fees: { total: 2250000, perYear: 450000, currency: 'INR' }, applicationOpenDate: '2024-01-15', applicationCloseDate: '2024-04-15', applicationLink: 'https://www.srmist.edu.in/admissions', eligibility: 90, location: 'Chennai, India' },
    { id: 'saveetha_dental', name: 'Saveetha Dental College', course: 'BDS', duration: '5 years', fees: { total: 2000000, perYear: 400000, currency: 'INR' }, applicationOpenDate: '2024-02-01', applicationCloseDate: '2024-04-30', applicationLink: 'https://www.saveetha.com/admissions', eligibility: 91, location: 'Chennai, India' },
    { id: 'manipal_bangalore_dental', name: 'Manipal College of Dental Sciences Bangalore', course: 'BDS', duration: '5 years', fees: { total: 2500000, perYear: 500000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.manipal.edu/admissions', eligibility: 90, location: 'Bangalore, India' },
  ],

  // OTHER ENGINEERING
  mechanical_engineering: [
    { id: 'iit_delhi_mech', name: 'IIT Delhi', course: 'B.Tech Mechanical Engineering', duration: '4 years', fees: { total: 800000, perYear: 200000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.iitd.ac.in/admissions', eligibility: 93, location: 'New Delhi, India' },
    { id: 'iit_bombay_mech', name: 'IIT Bombay', course: 'B.Tech Mechanical Engineering', duration: '4 years', fees: { total: 850000, perYear: 212500, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.iitb.ac.in/admissions', eligibility: 94, location: 'Mumbai, India' },
    { id: 'iit_madras_mech', name: 'IIT Madras', course: 'B.Tech Mechanical Engineering', duration: '4 years', fees: { total: 750000, perYear: 187500, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.iitm.ac.in/admissions', eligibility: 92, location: 'Chennai, India' },
    { id: 'nit_surathkal_mech', name: 'NIT Surathkal', course: 'B.Tech Mechanical Engineering', duration: '4 years', fees: { total: 600000, perYear: 150000, currency: 'INR' }, applicationOpenDate: '2024-01-15', applicationCloseDate: '2024-04-15', applicationLink: 'https://www.nitk.ac.in/admissions', eligibility: 91, location: 'Surathkal, India' },
    { id: 'iit_kanpur_mech', name: 'IIT Kanpur', course: 'B.Tech Mechanical Engineering', duration: '4 years', fees: { total: 800000, perYear: 200000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.iitk.ac.in/admissions', eligibility: 93, location: 'Kanpur, India' },
  ],

  data_science: [
    { id: 'iit_delhi_ds', name: 'IIT Delhi', course: 'B.Tech Data Science', duration: '4 years', fees: { total: 800000, perYear: 200000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.iitd.ac.in/admissions', eligibility: 94, minMarksPercentage: 75, jeeRankCutoff: 5000, requiresJEE: true, location: 'New Delhi, India' },
    { id: 'iisc_bangalore_ds', name: 'IISc Bangalore', course: 'B.S. Data Science', duration: '4 years', fees: { total: 700000, perYear: 175000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.iisc.ac.in/admissions', eligibility: 96, minMarksPercentage: 75, jeeRankCutoff: 3000, requiresJEE: true, location: 'Bangalore, India' },
    { id: 'iit_hyderabad_ds', name: 'IIT Hyderabad', course: 'B.Tech Data Science', duration: '4 years', fees: { total: 750000, perYear: 187500, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.iith.ac.in/admissions', eligibility: 93, minMarksPercentage: 75, jeeRankCutoff: 6000, requiresJEE: true, location: 'Hyderabad, India' },
    { id: 'nit_warangal_ds', name: 'NIT Warangal', course: 'B.Tech Data Science', duration: '4 years', fees: { total: 600000, perYear: 150000, currency: 'INR' }, applicationOpenDate: '2024-01-15', applicationCloseDate: '2024-04-15', applicationLink: 'https://www.nitw.ac.in/admissions', eligibility: 91, minMarksPercentage: 75, jeeRankCutoff: 12000, requiresJEE: true, location: 'Warangal, India' },
    { id: 'iiit_hyderabad_ds', name: 'IIIT Hyderabad', course: 'B.Tech Data Science', duration: '4 years', fees: { total: 900000, perYear: 225000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-04-30', applicationLink: 'https://www.iiit.ac.in/admissions', eligibility: 92, minMarksPercentage: 75, jeeRankCutoff: 7000, requiresJEE: true, location: 'Hyderabad, India' },
    { id: 'vit_vellore_ds', name: 'VIT Vellore', course: 'B.Tech Data Science', duration: '4 years', fees: { total: 1400000, perYear: 350000, currency: 'INR' }, applicationOpenDate: '2024-01-10', applicationCloseDate: '2024-05-31', applicationLink: 'https://vit.ac.in/admissions', eligibility: 90, minMarksPercentage: 60, jeeRankCutoff: null, requiresJEE: false, location: 'Vellore, India' },
    { id: 'pes_bangalore_ds', name: 'PES University', course: 'B.Tech Data Science', duration: '4 years', fees: { total: 1200000, perYear: 300000, currency: 'INR' }, applicationOpenDate: '2024-02-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://www.pes.edu/admissions', eligibility: 90, minMarksPercentage: 60, jeeRankCutoff: null, requiresJEE: false, location: 'Bangalore, India' },
  ],

  // BOOMING CAREERS - AI & Machine Learning
  ai_ml_engineering: [
    { id: 'iit_delhi_ai', name: 'IIT Delhi', course: 'B.Tech AI & Machine Learning', duration: '4 years', fees: { total: 800000, perYear: 200000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.iitd.ac.in/admissions', eligibility: 96, minMarksPercentage: 75, jeeRankCutoff: 3000, requiresJEE: true, location: 'New Delhi, India' },
    { id: 'iit_bombay_ai', name: 'IIT Bombay', course: 'B.Tech AI & Machine Learning', duration: '4 years', fees: { total: 850000, perYear: 212500, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.iitb.ac.in/admissions', eligibility: 95, minMarksPercentage: 75, jeeRankCutoff: 2500, requiresJEE: true, location: 'Mumbai, India' },
    { id: 'iit_madras_ai', name: 'IIT Madras', course: 'B.Tech AI & Machine Learning', duration: '4 years', fees: { total: 750000, perYear: 187500, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.iitm.ac.in/admissions', eligibility: 94, minMarksPercentage: 75, jeeRankCutoff: 4000, requiresJEE: true, location: 'Chennai, India' },
    { id: 'iiit_hyderabad_ai', name: 'IIIT Hyderabad', course: 'B.Tech AI & Machine Learning', duration: '4 years', fees: { total: 900000, perYear: 225000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-04-30', applicationLink: 'https://www.iiit.ac.in/admissions', eligibility: 93, minMarksPercentage: 75, jeeRankCutoff: 6000, requiresJEE: true, location: 'Hyderabad, India' },
    { id: 'nit_surathkal_ai', name: 'NIT Surathkal', course: 'B.Tech AI & Machine Learning', duration: '4 years', fees: { total: 600000, perYear: 150000, currency: 'INR' }, applicationOpenDate: '2024-01-15', applicationCloseDate: '2024-04-15', applicationLink: 'https://www.nitk.ac.in/admissions', eligibility: 92, minMarksPercentage: 75, jeeRankCutoff: 10000, requiresJEE: true, location: 'Surathkal, India' },
    { id: 'vit_vellore_ai', name: 'VIT Vellore', course: 'B.Tech AI & Machine Learning', duration: '4 years', fees: { total: 1400000, perYear: 350000, currency: 'INR' }, applicationOpenDate: '2024-01-10', applicationCloseDate: '2024-05-31', applicationLink: 'https://vit.ac.in/admissions', eligibility: 91, minMarksPercentage: 60, jeeRankCutoff: null, requiresJEE: false, location: 'Vellore, India' },
    { id: 'pes_bangalore_ai', name: 'PES University', course: 'B.Tech AI & Machine Learning', duration: '4 years', fees: { total: 1200000, perYear: 300000, currency: 'INR' }, applicationOpenDate: '2024-02-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://www.pes.edu/admissions', eligibility: 90, minMarksPercentage: 60, jeeRankCutoff: null, requiresJEE: false, location: 'Bangalore, India' },
    { id: 'srm_ai', name: 'SRM Institute', course: 'B.Tech AI & Machine Learning', duration: '4 years', fees: { total: 1200000, perYear: 300000, currency: 'INR' }, applicationOpenDate: '2024-01-15', applicationCloseDate: '2024-04-15', applicationLink: 'https://www.srmist.edu.in/admissions', eligibility: 90, minMarksPercentage: 60, jeeRankCutoff: null, requiresJEE: false, location: 'Chennai, India' },
  ],

  // BOOMING CAREERS - Cybersecurity
  cybersecurity: [
    { id: 'iit_delhi_cyber', name: 'IIT Delhi', course: 'B.Tech Cybersecurity', duration: '4 years', fees: { total: 800000, perYear: 200000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.iitd.ac.in/admissions', eligibility: 95, minMarksPercentage: 75, jeeRankCutoff: 4000, requiresJEE: true, location: 'New Delhi, India' },
    { id: 'nit_warangal_cyber', name: 'NIT Warangal', course: 'B.Tech Cybersecurity', duration: '4 years', fees: { total: 600000, perYear: 150000, currency: 'INR' }, applicationOpenDate: '2024-01-15', applicationCloseDate: '2024-04-15', applicationLink: 'https://www.nitw.ac.in/admissions', eligibility: 93, minMarksPercentage: 75, jeeRankCutoff: 10000, requiresJEE: true, location: 'Warangal, India' },
    { id: 'iiit_hyderabad_cyber', name: 'IIIT Hyderabad', course: 'B.Tech Cybersecurity', duration: '4 years', fees: { total: 900000, perYear: 225000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-04-30', applicationLink: 'https://www.iiit.ac.in/admissions', eligibility: 94, minMarksPercentage: 75, jeeRankCutoff: 7000, requiresJEE: true, location: 'Hyderabad, India' },
    { id: 'vit_vellore_cyber', name: 'VIT Vellore', course: 'B.Tech Cybersecurity', duration: '4 years', fees: { total: 1400000, perYear: 350000, currency: 'INR' }, applicationOpenDate: '2024-01-10', applicationCloseDate: '2024-05-31', applicationLink: 'https://vit.ac.in/admissions', eligibility: 92, minMarksPercentage: 60, jeeRankCutoff: null, requiresJEE: false, location: 'Vellore, India' },
    { id: 'pes_bangalore_cyber', name: 'PES University', course: 'B.Tech Cybersecurity', duration: '4 years', fees: { total: 1200000, perYear: 300000, currency: 'INR' }, applicationOpenDate: '2024-02-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://www.pes.edu/admissions', eligibility: 91, minMarksPercentage: 60, jeeRankCutoff: null, requiresJEE: false, location: 'Bangalore, India' },
    { id: 'amity_cyber', name: 'Amity University', course: 'B.Tech Cybersecurity', duration: '4 years', fees: { total: 1000000, perYear: 250000, currency: 'INR' }, applicationOpenDate: '2024-02-01', applicationCloseDate: '2024-05-31', applicationLink: 'https://www.amity.edu/admissions', eligibility: 90, minMarksPercentage: 60, jeeRankCutoff: null, requiresJEE: false, location: 'Noida, India' },
  ],

  // BOOMING CAREERS - Digital Marketing & E-commerce
  digital_marketing: [
    { id: 'nmims_digital', name: 'NMIMS Mumbai', course: 'BBA Digital Marketing', duration: '3 years', fees: { total: 900000, perYear: 300000, currency: 'INR' }, applicationOpenDate: '2024-01-15', applicationCloseDate: '2024-06-15', applicationLink: 'https://www.nmims.edu/admissions', eligibility: 92, minMarksPercentage: 50, jeeRankCutoff: null, requiresJEE: false, location: 'Mumbai, India' },
    { id: 'christ_digital', name: 'Christ University', course: 'BBA Digital Marketing', duration: '3 years', fees: { total: 450000, perYear: 150000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.christuniversity.in', eligibility: 91, minMarksPercentage: 50, jeeRankCutoff: null, requiresJEE: false, location: 'Bangalore, India' },
    { id: 'symbiosis_digital', name: 'Symbiosis International', course: 'BBA Digital Marketing', duration: '3 years', fees: { total: 600000, perYear: 200000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-04-30', applicationLink: 'https://www.siu.edu.in/admissions', eligibility: 90, minMarksPercentage: 50, jeeRankCutoff: null, requiresJEE: false, location: 'Pune, India' },
    { id: 'jain_digital', name: 'Jain University', course: 'BBA Digital Marketing', duration: '3 years', fees: { total: 450000, perYear: 150000, currency: 'INR' }, applicationOpenDate: '2024-02-01', applicationCloseDate: '2024-05-31', applicationLink: 'https://www.jainuniversity.ac.in/admissions', eligibility: 90, minMarksPercentage: 50, jeeRankCutoff: null, requiresJEE: false, location: 'Bangalore, India' },
  ],

  business_management: [
    { id: 'iim_bangalore_mba', name: 'IIM Bangalore', course: 'MBA', duration: '2 years', fees: { total: 2400000, perYear: 1200000, currency: 'INR' }, applicationOpenDate: '2024-08-01', applicationCloseDate: '2024-11-30', applicationLink: 'https://www.iimb.ac.in/admissions', eligibility: 95, location: 'Bangalore, India' },
    { id: 'iim_ahmedabad_mba', name: 'IIM Ahmedabad', course: 'MBA', duration: '2 years', fees: { total: 2500000, perYear: 1250000, currency: 'INR' }, applicationOpenDate: '2024-08-01', applicationCloseDate: '2024-11-30', applicationLink: 'https://www.iima.ac.in/admissions', eligibility: 96, location: 'Ahmedabad, India' },
    { id: 'iim_calcutta_mba', name: 'IIM Calcutta', course: 'MBA', duration: '2 years', fees: { total: 2300000, perYear: 1150000, currency: 'INR' }, applicationOpenDate: '2024-08-01', applicationCloseDate: '2024-11-30', applicationLink: 'https://www.iimcal.ac.in/admissions', eligibility: 94, location: 'Kolkata, India' },
    { id: 'xlri_mba', name: 'XLRI Jamshedpur', course: 'MBA', duration: '2 years', fees: { total: 2200000, perYear: 1100000, currency: 'INR' }, applicationOpenDate: '2024-07-01', applicationCloseDate: '2024-12-31', applicationLink: 'https://www.xlri.ac.in/admissions', eligibility: 93, location: 'Jamshedpur, India' },
    { id: 'fms_delhi_mba', name: 'FMS Delhi', course: 'MBA', duration: '2 years', fees: { total: 400000, perYear: 200000, currency: 'INR' }, applicationOpenDate: '2024-08-01', applicationCloseDate: '2024-11-30', applicationLink: 'https://www.fms.edu/admissions', eligibility: 92, location: 'New Delhi, India' },
  ],

  // Additional career mappings
  electronics_engineering: [
    { id: 'iit_delhi_eee', name: 'IIT Delhi', course: 'B.Tech Electronics Engineering', duration: '4 years', fees: { total: 800000, perYear: 200000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.iitd.ac.in/admissions', eligibility: 92, location: 'New Delhi, India' },
    { id: 'iit_bombay_eee', name: 'IIT Bombay', course: 'B.Tech Electronics Engineering', duration: '4 years', fees: { total: 850000, perYear: 212500, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.iitb.ac.in/admissions', eligibility: 93, location: 'Mumbai, India' },
    { id: 'iit_madras_eee', name: 'IIT Madras', course: 'B.Tech Electronics Engineering', duration: '4 years', fees: { total: 750000, perYear: 187500, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.iitm.ac.in/admissions', eligibility: 91, location: 'Chennai, India' },
    { id: 'nit_calicut_eee', name: 'NIT Calicut', course: 'B.Tech Electronics Engineering', duration: '4 years', fees: { total: 600000, perYear: 150000, currency: 'INR' }, applicationOpenDate: '2024-01-15', applicationCloseDate: '2024-04-15', applicationLink: 'https://www.nitc.ac.in/admissions', eligibility: 90, location: 'Calicut, India' },
    { id: 'iit_hyderabad_eee', name: 'IIT Hyderabad', course: 'B.Tech Electronics Engineering', duration: '4 years', fees: { total: 750000, perYear: 187500, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.iith.ac.in/admissions', eligibility: 92, location: 'Hyderabad, India' },
  ],

  civil_engineering: [
    { id: 'iit_delhi_civil', name: 'IIT Delhi', course: 'B.Tech Civil Engineering', duration: '4 years', fees: { total: 800000, perYear: 200000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.iitd.ac.in/admissions', eligibility: 92, location: 'New Delhi, India' },
    { id: 'iit_bombay_civil', name: 'IIT Bombay', course: 'B.Tech Civil Engineering', duration: '4 years', fees: { total: 850000, perYear: 212500, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.iitb.ac.in/admissions', eligibility: 93, location: 'Mumbai, India' },
    { id: 'nit_trichy_civil', name: 'NIT Trichy', course: 'B.Tech Civil Engineering', duration: '4 years', fees: { total: 600000, perYear: 150000, currency: 'INR' }, applicationOpenDate: '2024-01-15', applicationCloseDate: '2024-04-15', applicationLink: 'https://www.nitt.edu/admissions', eligibility: 91, location: 'Tiruchirappalli, India' },
    { id: 'nit_surathkal_civil', name: 'NIT Surathkal', course: 'B.Tech Civil Engineering', duration: '4 years', fees: { total: 600000, perYear: 150000, currency: 'INR' }, applicationOpenDate: '2024-01-15', applicationCloseDate: '2024-04-15', applicationLink: 'https://www.nitk.ac.in/admissions', eligibility: 90, location: 'Surathkal, India' },
    { id: 'iit_kanpur_civil', name: 'IIT Kanpur', course: 'B.Tech Civil Engineering', duration: '4 years', fees: { total: 800000, perYear: 200000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.iitk.ac.in/admissions', eligibility: 92, location: 'Kanpur, India' },
  ],

  bpharm_pharmacy: [
    { id: 'nip_ahmedabad', name: 'NIPER Ahmedabad', course: 'B.Pharm', duration: '4 years', fees: { total: 400000, perYear: 100000, currency: 'INR' }, applicationOpenDate: '2024-03-01', applicationCloseDate: '2024-05-31', applicationLink: 'https://www.niperahm.res.in/admissions', eligibility: 92, location: 'Ahmedabad, India' },
    { id: 'manipal_pharmacy', name: 'Manipal College of Pharmaceutical Sciences', course: 'B.Pharm', duration: '4 years', fees: { total: 1200000, perYear: 300000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.manipal.edu/admissions', eligibility: 91, location: 'Manipal, India' },
    { id: 'jss_pharmacy', name: 'JSS College of Pharmacy', course: 'B.Pharm', duration: '4 years', fees: { total: 800000, perYear: 200000, currency: 'INR' }, applicationOpenDate: '2024-02-01', applicationCloseDate: '2024-04-30', applicationLink: 'https://www.jssuni.edu.in/admissions', eligibility: 90, location: 'Mysore, India' },
    { id: 'birla_pharmacy', name: 'Birla Institute of Technology', course: 'B.Pharm', duration: '4 years', fees: { total: 1000000, perYear: 250000, currency: 'INR' }, applicationOpenDate: '2024-01-15', applicationCloseDate: '2024-04-15', applicationLink: 'https://www.bitmesra.ac.in/admissions', eligibility: 91, location: 'Ranchi, India' },
    { id: 'nmims_pharmacy', name: 'NMIMS Pharmacy', course: 'B.Pharm', duration: '4 years', fees: { total: 1100000, perYear: 275000, currency: 'INR' }, applicationOpenDate: '2024-01-15', applicationCloseDate: '2024-06-15', applicationLink: 'https://www.nmims.edu/admissions', eligibility: 90, location: 'Mumbai, India' },
  ],

  bpt_physiotherapy: [
    { id: 'manipal_physio', name: 'Manipal College of Allied Health Sciences', course: 'BPT', duration: '4.5 years', fees: { total: 1000000, perYear: 222222, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.manipal.edu/admissions', eligibility: 90, location: 'Manipal, India' },
    { id: 'srm_physio', name: 'SRM Institute of Science and Technology', course: 'BPT', duration: '4.5 years', fees: { total: 900000, perYear: 200000, currency: 'INR' }, applicationOpenDate: '2024-01-15', applicationCloseDate: '2024-04-15', applicationLink: 'https://www.srmist.edu.in/admissions', eligibility: 91, location: 'Chennai, India' },
    { id: 'christ_physio', name: 'Christ University', course: 'BPT', duration: '4.5 years', fees: { total: 675000, perYear: 150000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.christuniversity.in', eligibility: 90, location: 'Bangalore, India' },
    { id: 'amity_physio', name: 'Amity University', course: 'BPT', duration: '4.5 years', fees: { total: 800000, perYear: 177778, currency: 'INR' }, applicationOpenDate: '2024-02-01', applicationCloseDate: '2024-05-31', applicationLink: 'https://www.amity.edu/admissions', eligibility: 90, location: 'Noida, India' },
    { id: 'lpu_physio', name: 'Lovely Professional University', course: 'BPT', duration: '4.5 years', fees: { total: 675000, perYear: 150000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://www.lpu.in/admissions', eligibility: 90, location: 'Punjab, India' },
  ],

  nursing: [
    { id: 'aiims_delhi_nursing', name: 'AIIMS New Delhi', course: 'B.Sc Nursing', duration: '4 years', fees: { total: 44000, perYear: 11000, currency: 'INR' }, applicationOpenDate: '2024-03-01', applicationCloseDate: '2024-04-30', applicationLink: 'https://www.aiims.edu/en/admissions', eligibility: 95, location: 'New Delhi, India' },
    { id: 'cmc_vellore_nursing', name: 'Christian Medical College Vellore', course: 'B.Sc Nursing', duration: '4 years', fees: { total: 264000, perYear: 66000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-02-28', applicationLink: 'https://www.cmch-vellore.edu/admissions', eligibility: 94, location: 'Vellore, India' },
    { id: 'manipal_nursing', name: 'Manipal College of Nursing', course: 'B.Sc Nursing', duration: '4 years', fees: { total: 800000, perYear: 200000, currency: 'INR' }, applicationOpenDate: '2024-01-01', applicationCloseDate: '2024-03-31', applicationLink: 'https://www.manipal.edu/admissions', eligibility: 92, location: 'Manipal, India' },
    { id: 'srm_nursing', name: 'SRM College of Nursing', course: 'B.Sc Nursing', duration: '4 years', fees: { total: 600000, perYear: 150000, currency: 'INR' }, applicationOpenDate: '2024-01-15', applicationCloseDate: '2024-04-15', applicationLink: 'https://www.srmist.edu.in/admissions', eligibility: 91, location: 'Chennai, India' },
    { id: 'jipmer_nursing', name: 'JIPMER Puducherry', course: 'B.Sc Nursing', duration: '4 years', fees: { total: 44000, perYear: 11000, currency: 'INR' }, applicationOpenDate: '2024-03-01', applicationCloseDate: '2024-04-30', applicationLink: 'https://www.jipmer.edu.in/admissions', eligibility: 93, location: 'Puducherry, India' },
  ],
};

// State Counseling Colleges Database
const stateCounselingColleges = {
  'tamil-nadu': {
    engineering: [
      { id: 'tn_eng_counseling', name: 'Tamil Nadu Engineering Counseling', course: 'B.E./B.Tech (All Branches)', duration: '4 years', fees: { total: 400000, perYear: 100000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://www.tneaonline.org', eligibility: 95, minMarksPercentage: 50, jeeRankCutoff: null, requiresJEE: false, location: 'Tamil Nadu, India', isStateCounseling: true, stateCounselingName: 'TNEA (Tamil Nadu Engineering Admissions)' },
    ],
    medical: [
      { id: 'tn_med_counseling', name: 'Tamil Nadu Medical Counseling', course: 'MBBS/BDS', duration: '5.5 years', fees: { total: 550000, perYear: 100000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://www.tnhealth.tn.gov.in', eligibility: 95, minMarksPercentage: 50, neetRankCutoff: 50000, requiresNeet: true, location: 'Tamil Nadu, India', isStateCounseling: true, stateCounselingName: 'Tamil Nadu Medical Counseling' },
    ],
  },
  'karnataka': {
    engineering: [
      { id: 'karnataka_eng_counseling', name: 'Karnataka Engineering Counseling', course: 'B.E./B.Tech (All Branches)', duration: '4 years', fees: { total: 450000, perYear: 112500, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://cetonline.karnataka.gov.in', eligibility: 95, minMarksPercentage: 45, jeeRankCutoff: null, requiresJEE: false, location: 'Karnataka, India', isStateCounseling: true, stateCounselingName: 'KCET (Karnataka Common Entrance Test)' },
    ],
    medical: [
      { id: 'karnataka_med_counseling', name: 'Karnataka Medical Counseling', course: 'MBBS/BDS', duration: '5.5 years', fees: { total: 550000, perYear: 100000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://cetonline.karnataka.gov.in', eligibility: 95, minMarksPercentage: 50, neetRankCutoff: 50000, requiresNeet: true, location: 'Karnataka, India', isStateCounseling: true, stateCounselingName: 'Karnataka Medical Counseling' },
    ],
  },
  'maharashtra': {
    engineering: [
      { id: 'maharashtra_eng_counseling', name: 'Maharashtra Engineering Counseling', course: 'B.E./B.Tech (All Branches)', duration: '4 years', fees: { total: 500000, perYear: 125000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://mhtcet2024.mahacet.org', eligibility: 95, minMarksPercentage: 50, jeeRankCutoff: null, requiresJEE: false, location: 'Maharashtra, India', isStateCounseling: true, stateCounselingName: 'MHT CET (Maharashtra Common Entrance Test)' },
    ],
    medical: [
      { id: 'maharashtra_med_counseling', name: 'Maharashtra Medical Counseling', course: 'MBBS/BDS', duration: '5.5 years', fees: { total: 550000, perYear: 100000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://mcc.nic.in', eligibility: 95, minMarksPercentage: 50, neetRankCutoff: 50000, requiresNeet: true, location: 'Maharashtra, India', isStateCounseling: true, stateCounselingName: 'Maharashtra Medical Counseling' },
    ],
  },
  'andhra-pradesh': {
    engineering: [
      { id: 'ap_eng_counseling', name: 'Andhra Pradesh Engineering Counseling', course: 'B.E./B.Tech (All Branches)', duration: '4 years', fees: { total: 400000, perYear: 100000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://apeamcet.nic.in', eligibility: 95, minMarksPercentage: 45, jeeRankCutoff: null, requiresJEE: false, location: 'Andhra Pradesh, India', isStateCounseling: true, stateCounselingName: 'AP EAMCET (Engineering)' },
    ],
    medical: [
      { id: 'ap_med_counseling', name: 'Andhra Pradesh Medical Counseling', course: 'MBBS/BDS', duration: '5.5 years', fees: { total: 550000, perYear: 100000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://apeamcet.nic.in', eligibility: 95, minMarksPercentage: 50, neetRankCutoff: 50000, requiresNeet: true, location: 'Andhra Pradesh, India', isStateCounseling: true, stateCounselingName: 'AP EAMCET (Medical)' },
    ],
  },
  'telangana': {
    engineering: [
      { id: 'telangana_eng_counseling', name: 'Telangana Engineering Counseling', course: 'B.E./B.Tech (All Branches)', duration: '4 years', fees: { total: 400000, perYear: 100000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://tseamcet.nic.in', eligibility: 95, minMarksPercentage: 45, jeeRankCutoff: null, requiresJEE: false, location: 'Telangana, India', isStateCounseling: true, stateCounselingName: 'TS EAMCET (Engineering)' },
    ],
    medical: [
      { id: 'telangana_med_counseling', name: 'Telangana Medical Counseling', course: 'MBBS/BDS', duration: '5.5 years', fees: { total: 550000, perYear: 100000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://tseamcet.nic.in', eligibility: 95, minMarksPercentage: 50, neetRankCutoff: 50000, requiresNeet: true, location: 'Telangana, India', isStateCounseling: true, stateCounselingName: 'TS EAMCET (Medical)' },
    ],
  },
  'kerala': {
    engineering: [
      { id: 'kerala_eng_counseling', name: 'Kerala Engineering Counseling', course: 'B.E./B.Tech (All Branches)', duration: '4 years', fees: { total: 400000, perYear: 100000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://www.cee.kerala.gov.in', eligibility: 95, minMarksPercentage: 50, jeeRankCutoff: null, requiresJEE: false, location: 'Kerala, India', isStateCounseling: true, stateCounselingName: 'KEAM (Kerala Engineering Architecture Medical)' },
    ],
    medical: [
      { id: 'kerala_med_counseling', name: 'Kerala Medical Counseling', course: 'MBBS/BDS', duration: '5.5 years', fees: { total: 550000, perYear: 100000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://www.cee.kerala.gov.in', eligibility: 95, minMarksPercentage: 50, neetRankCutoff: 50000, requiresNeet: true, location: 'Kerala, India', isStateCounseling: true, stateCounselingName: 'KEAM (Kerala Engineering Architecture Medical)' },
    ],
  },
  'west-bengal': {
    engineering: [
      { id: 'wb_eng_counseling', name: 'West Bengal Engineering Counseling', course: 'B.E./B.Tech (All Branches)', duration: '4 years', fees: { total: 400000, perYear: 100000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://wbjeeb.nic.in', eligibility: 95, minMarksPercentage: 45, jeeRankCutoff: null, requiresJEE: false, location: 'West Bengal, India', isStateCounseling: true, stateCounselingName: 'WBJEE (West Bengal Joint Entrance Examination)' },
    ],
    medical: [
      { id: 'wb_med_counseling', name: 'West Bengal Medical Counseling', course: 'MBBS/BDS', duration: '5.5 years', fees: { total: 550000, perYear: 100000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://wbjeeb.nic.in', eligibility: 95, minMarksPercentage: 50, neetRankCutoff: 50000, requiresNeet: true, location: 'West Bengal, India', isStateCounseling: true, stateCounselingName: 'WBJEE (West Bengal Joint Entrance Examination)' },
    ],
  },
  'uttar-pradesh': {
    engineering: [
      { id: 'up_eng_counseling', name: 'Uttar Pradesh Engineering Counseling', course: 'B.E./B.Tech (All Branches)', duration: '4 years', fees: { total: 400000, perYear: 100000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://jeecup.admissions.nic.in', eligibility: 95, minMarksPercentage: 45, jeeRankCutoff: null, requiresJEE: false, location: 'Uttar Pradesh, India', isStateCounseling: true, stateCounselingName: 'UPJEE (Uttar Pradesh Joint Entrance Examination)' },
    ],
    medical: [
      { id: 'up_med_counseling', name: 'Uttar Pradesh Medical Counseling', course: 'MBBS/BDS', duration: '5.5 years', fees: { total: 550000, perYear: 100000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://upneet.gov.in', eligibility: 95, minMarksPercentage: 50, neetRankCutoff: 50000, requiresNeet: true, location: 'Uttar Pradesh, India', isStateCounseling: true, stateCounselingName: 'Uttar Pradesh Medical Counseling' },
    ],
  },
  'delhi': {
    engineering: [
      { id: 'delhi_eng_counseling', name: 'Delhi Engineering Counseling', course: 'B.E./B.Tech (All Branches)', duration: '4 years', fees: { total: 400000, perYear: 100000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://www.dtu.ac.in/admissions', eligibility: 95, minMarksPercentage: 60, jeeRankCutoff: 20000, requiresJEE: true, location: 'Delhi, India', isStateCounseling: true, stateCounselingName: 'Delhi Engineering Counseling' },
    ],
    medical: [
      { id: 'delhi_med_counseling', name: 'Delhi Medical Counseling', course: 'MBBS/BDS', duration: '5.5 years', fees: { total: 550000, perYear: 100000, currency: 'INR' }, applicationOpenDate: '2024-05-01', applicationCloseDate: '2024-06-30', applicationLink: 'https://www.dmce.ac.in', eligibility: 95, minMarksPercentage: 50, neetRankCutoff: 50000, requiresNeet: true, location: 'Delhi, India', isStateCounseling: true, stateCounselingName: 'Delhi Medical Counseling' },
    ],
  },
};

// Helper function to get state counseling colleges
// --- REPLACE YOUR OLD COUNSELING TYPE BLOCK WITH THIS ---
  const lowerCareer = careerId.toLowerCase();
  
  // 1. Detect Medical first
  if (lowerCareer.includes('medicine') || 
      lowerCareer.includes('mbbs') || 
      lowerCareer.includes('doctor') || 
      lowerCareer.includes('dental') || 
      lowerCareer.includes('bds')) {
    counselingType = 'medical';
  } 
  // 2. Detect Engineering second
  else if (lowerCareer.includes('engineering') || 
           lowerCareer.includes('tech') || 
           lowerCareer.includes('data') || 
           lowerCareer.includes('ai')) {
    counselingType = 'engineering';
  }
  // --- END OF REPLACEMENT ---
}

export async function getCollegesForCareer(careerId, studentData = {}) {
  try {
    const colleges = mockCollegesDatabase[careerId] || [];
    const { marks, jeeRank, neetRank, catScore, matScore, stream, state } = studentData;
    
    // Filter colleges based on student eligibility
    let eligibleColleges = colleges.filter(college => {
      // Check marks percentage eligibility
      if (marks !== null && marks !== undefined) {
        // College requires minimum marks percentage
        const minMarksRequired = college.minMarksPercentage || college.eligibility;
        if (marks < minMarksRequired) {
          return false; // Student doesn't meet marks requirement
        }
      }

      // Check JEE rank if provided (for engineering colleges)
      if (college.requiresJEE || college.jeeRankCutoff) {
        if (jeeRank === null || jeeRank === undefined) {
          return false; // College requires JEE but student didn't attempt
        }
        if (college.jeeRankCutoff && jeeRank > college.jeeRankCutoff) {
          return false; // Student's rank is worse than cutoff
        }
      }

      // Check NEET rank if provided (for medical colleges)
      if (college.requiresNEET || college.neetRankCutoff) {
        if (neetRank === null || neetRank === undefined) {
          return false; // College requires NEET but student didn't attempt
        }
        if (college.neetRankCutoff && neetRank > college.neetRankCutoff) {
          return false; // Student's rank is worse than cutoff
        }
      }

      // Check CAT score if provided (for MBA colleges)
      if (college.requiresCAT || college.catScoreCutoff) {
        if (catScore === null || catScore === undefined) {
          return false; // College requires CAT but student didn't attempt
        }
        if (college.catScoreCutoff && catScore < college.catScoreCutoff) {
          return false; // Student's score is lower than cutoff
        }
      }

      // Check MAT score if provided (for MBA colleges)
      if (college.requiresMAT || college.matScoreCutoff) {
        if (matScore === null || matScore === undefined) {
          return false; // College requires MAT but student didn't attempt
        }
        if (college.matScoreCutoff && matScore < college.matScoreCutoff) {
          return false; // Student's score is lower than cutoff
        }
      }

      return true; // Student is eligible
    });

    // Get state counseling colleges if state is provided
    let stateCounselingCollegesList = [];
    if (state) {
      stateCounselingCollegesList = getStateCounselingColleges(state, careerId, studentData);
    }

    // Sort by eligibility/match percentage (higher is better)
    eligibleColleges = eligibleColleges
      .sort((a, b) => {
        // Prioritize colleges with better eligibility scores
        return b.eligibility - a.eligibility;
      })
      .slice(0, 10); // Top 10 eligible colleges for more opportunities

    // Combine regular colleges with state counseling (state counseling first)
    const allColleges = [...stateCounselingCollegesList, ...eligibleColleges];

    return {
      colleges: allColleges,
      totalEligible: allColleges.length,
      studentMarks: marks,
      studentJeeRank: jeeRank,
      studentNeetRank: neetRank,
      studentCatScore: catScore,
      studentMatScore: matScore,
    };
  } catch (error) {
    console.error('Error fetching colleges:', error);
    throw error;
  }
}

export async function fetchFromExternalAPI(careerId) {
  return null;
}