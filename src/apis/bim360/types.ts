export type projectStatus = "active" | "pending" | "inactive" | "archived";

export type language = "en" | "de";

export type serviceType = "field" | "glue" | "schedule" | "plan" | "doc_manager";

export type constructionType = "New Construction" | "Renovation";

export type contractType = "Construction Management (CM) at Risk" | "Design-Bid" | "Design-Bid-Build" | "Design-Build-Operate" | "IPD";

export type projectType =
  | "Commercial"
  | "Convention Center"
  | "Data Center"
  | "Hotel / Motel"
  | "Office"
  | "Parking Structure / Garage"
  | "Performing Arts"
  | "Retail"
  | "Stadium/Arena"
  | "Theme Park"
  | "Warehouse (non-manufacturing)"
  | "Healthcare"
  | "Assisted Living / Nursing Home"
  | "Hospital"
  | "Medical Laboratory"
  | "Medical Office"
  | "OutPatient Surgery Center"
  | "Institutional"
  | "Court House"
  | "Dormitory"
  | "Education Facility"
  | "Government Building"
  | "Library"
  | "Military Facility"
  | "Museum"
  | "Prison / Correctional Facility"
  | "Recreation Building"
  | "Religious Building"
  | "Research Facility / Laboratory"
  | "Residential"
  | "Multi-Family Housing"
  | "Single-Family Housing"
  | "Infrastructure"
  | "Airport"
  | "Bridge"
  | "Canal / Waterway"
  | "Dams / Flood Control / Reservoirs"
  | "Harbor / River Development"
  | "Rail"
  | "Seaport"
  | "Streets / Roads / Highways"
  | "Transportation Building"
  | "Tunnel"
  | "Waste Water / Sewers"
  | "Water Supply"
  | "Industrial & Energy"
  | "Manufacturing / Factory"
  | "Oil & Gas"
  | "Plant"
  | "Power Plant"
  | "Solar Far"
  | "Utilities"
  | "Wind Farm"
  | "Sample Projects"
  | "Demonstration Project"
  | "Template Project"
  | "Training Project";

export type currency =
  | "USD"
  | "AUD"
  | "CAD"
  | "EUR"
  | "GBP"
  | "ALL"
  | "AZN"
  | "BYR"
  | "BRL"
  | "BGN"
  | "CNY"
  | "HRK"
  | "CZK"
  | "DKK"
  | "EEK"
  | "HKD"
  | "HUF"
  | "ISK"
  | "INR"
  | "IRR"
  | "ILS"
  | "JPY"
  | "KZT"
  | "KRW"
  | "KPW"
  | "KGS"
  | "LVL"
  | "LTL"
  | "MKD"
  | "MNT"
  | "ANG"
  | "NOK"
  | "PKR"
  | "PLN"
  | "RON"
  | "RUB"
  | "SAR"
  | "RSD"
  | "SGD"
  | "ZAR"
  | "SEK"
  | "CHF"
  | "TWD"
  | "TRL"
  | "UAH"
  | "UZS"
  | "YER"
  | "PHP"
  | "NZD";

export type timezone =
  | "Pacific/Honolulu"
  | "America/Juneau"
  | "America/Los_Angeles"
  | "America/Phoenix"
  | "America/Denver"
  | "America/Chicago"
  | "America/New_York"
  | "America/Indiana/Indianapolis"
  | "Pacific/Pago_Pago"
  | "Pacific/Midway"
  | "America/Tijuana"
  | "America/Chihuahua"
  | "America/Mazatlan"
  | "America/Guatemala"
  | "America/Mexico_City"
  | "America/Monterrey"
  | "America/Regina"
  | "America/Bogota"
  | "America/Lima"
  | "America/Caracas"
  | "America/Halifax"
  | "America/Guyana"
  | "America/La_Paz"
  | "America/Santiago"
  | "America/St_Johns"
  | "America/Sao_Paulo"
  | "America/Argentina/Buenos_Aires"
  | "America/Godthab"
  | "Atlantic/South_Georgia"
  | "Atlantic/Azores"
  | "Atlantic/Cape_Verde"
  | "Africa/Casablanca"
  | "Europe/Dublin"
  | "Europe/Lisbon"
  | "Europe/London"
  | "Africa/Monrovia"
  | "ETC/UTC"
  | "Europe/Amsterdam"
  | "Europe/Belgrade"
  | "Europe/Berlin"
  | "Europe/Bratislava"
  | "Europe/Brussels"
  | "Europe/Budapest"
  | "Europe/Copenhagen"
  | "Europe/Ljubljana"
  | "Europe/Madrid"
  | "Europe/Paris"
  | "Europe/Prague"
  | "Europe/Rome"
  | "Europe/Sarajevo"
  | "Europe/Skopje"
  | "Europe/Stockholm"
  | "Europe/Vienna"
  | "Europe/Warsaw"
  | "Africa/Algiers"
  | "Europe/Zagreb"
  | "Europe/Athens"
  | "Europe/Bucharest"
  | "Africa/Cairo"
  | "Africa/Harare"
  | "Europe/Helsinki"
  | "Europe/Istanbul"
  | "Asia/Jerusalem"
  | "Europe/Kiev"
  | "Africa/Johannesburg"
  | "Europe/Riga"
  | "Europe/Sofia"
  | "Europe/Tallinn"
  | "Europe/Vilnius"
  | "Asia/Baghdad"
  | "Asia/Kuwait"
  | "Europe/Minsk"
  | "Africa/Nairobi"
  | "Asia/Riyadh"
  | "Asia/Tehran"
  | "Asia/Muscat"
  | "Asia/Baku"
  | "Europe/Moscow"
  | "Asia/Tbilisi"
  | "Asia/Yerevan"
  | "Asia/Kabul"
  | "Asia/Karachi"
  | "Asia/Tashkent"
  | "Asia/Kolkata"
  | "Asia/Colombo"
  | "Asia/Kathmandu"
  | "Asia/Almaty"
  | "Asia/Dhaka"
  | "Asia/Yekaterinburg"
  | "Asia/Rangoon"
  | "Asia/Bangkok"
  | "Asia/Jakarta"
  | "Asia/Novosibirsk"
  | "Asia/Shanghai"
  | "Asia/Chongqing"
  | "Asia/Hong_Kong"
  | "Asia/Krasnoyarsk"
  | "Asia/Kuala_Lumpur"
  | "Australia/Perth"
  | "Asia/Singapore"
  | "Asia/Taipei"
  | "Asia/Ulaanbaatar"
  | "Asia/Urumqi"
  | "Asia/Irkutsk"
  | "Asia/Tokyo"
  | "Asia/Seoul"
  | "Australia/Adelaide"
  | "Australia/Darwin"
  | "Australia/Brisbane"
  | "Australia/Melbourne"
  | "Pacific/Guam"
  | "Australia/Hobart"
  | "Pacific/Port_Moresby"
  | "Australia/Sydney"
  | "Asia/Yakutsk"
  | "Pacific/Noumea"
  | "Asia/Vladivostok"
  | "Pacific/Auckland"
  | "Pacific/Fiji"
  | "Asia/Kamchatka"
  | "Asia/Magadan"
  | "Pacific/Majurov"
  | "Pacific/Guadalcanal"
  | "Pacific/Tongatapu"
  | "Pacific/Apia"
  | "Pacific/Fakaofo";

export type assignedToType = "user" | "company" | "role";

export type issueStatus = "draft" | "open" | "close";

export type ProjectData = {
  id: string;
  account_id: string;
  name: string;
  start_date: Date | null;
  end_date: Date | null;
  project_type: string;
  value: number | null;
  currency: currency | null;
  status: projectStatus;
  job_number: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  city: string | null;
  state_or_province: string | null;
  postal_code: string | null;
  country: string;
  business_unit_id: string | null;
  timezone: timezone | null;
  language: language;
  construction_type: constructionType | null;
  contract_type: contractType | null;
  last_sign_in: Date | null;
  created_at: Date;
  updated_at: Date;
};

export type IssueData = {
  id: string;
  type: "quality_issues";
  links: { self: string };
  attributes: {
    created_at: Date;
    synced_at: Date;
    updated_at: Date;
    close_version: number | null;
    closed_at: Date | null;
    closed_by: string | null;
    created_by: string;
    starting_version: number;
    title: string;
    description: string;
    location_description: string | null;
    markup_metadata: string | null;
    tags: null;
    target_urn: string | null;
    snapshot_urn: null;
    target_urn_page: string | null;
    collection_urn: null;
    due_date: Date;
    identifier: number;
    status: issueStatus;
    assigned_to: string;
    assigned_to_type: assignedToType;
    answer: string | null;
    answered_at: Date | null;
    answered_by: string | null;
    pushpin_attributes: null;
    owner: string;
    issue_type_id: string;
    issue_type: string;
    issue_sub_type: null;
    root_cause_id: string;
    root_cause: "COORDINATION";
    quality_urns: null;
    permitted_statuses: string[];
    permitted_attributes: string[];
    comment_count: 0;
    attachment_count: 0;
    permitted_actions: ("add_comment" | "add_attachment")[];
    sheet_metadata: null;
    lbs_location: string;
    ng_issue_subtype_id: string;
    ng_issue_type_id: string;
    custom_attributes: unknown[];
    trades: null;
    comments_attributes: null;
    attachments_attributes: null;
  };
  relationships: {
    container: {
      links: { self: string; related: string };
    };
    attachments: {
      links: { self: string; related: string };
    };
    activity_batches: {
      links: { self: string; related: string };
    };
    comments: {
      links: { self: string; related: string };
    };
    root_cause_obj: {
      links: { self: string; related: string };
    };
    issue_type_obj: {
      links: { self: string; related: string };
    };
  };
};
