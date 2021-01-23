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

export type pushpinAttibutesType = {
  type: "TwoDVectorPushpin";
  location: {
    x: number;
    y: number;
    z: number;
  };
  object_id: null;
  viewer_state: {
    seedURN: string;
    viewport: {
      up: [number, number, number];
      eye: [string, string, string]; // number
      name: string;
      target: [string, string, string]; // number
      pivotPoint: [string, string, string]; // number
      projection: "orthographic";
      aspectRatio: number;
      worldUpVector: [number, number, number];
      isOrthographic: boolean;
      distanceToOrbit: number;
      orthographicHeight: number;
    };
    cutplanes: string[]; // unknown
    floorGuid: null;
    objectSet: [{ id: string[]; hidden: string[]; idType: "lmv"; isolated: string[]; explodeScale: number }];
    globalOffset: {
      x: number;
      y: number;
      z: number;
    };
    renderOptions: {
      toneMap: {
        method: number;
        exposure: number;
        lightMultiplier: number;
      };
      appearance: {
        ghostHidden: boolean;
        antiAliasing: boolean;
        displayLines: boolean;
        ambientShadow: boolean;
        displayPoints: boolean;
        swapBlackAndWhite: boolean;
        progressiveDisplay: boolean;
      };
      environment: "Boardwalk";
      ambientOcclusion: {
        radius: number;
        enabled: boolean;
        intensity: number;
      };
    };
    attributesVersion: 2;
  };
  created_at: Date;
  created_by: string;
  created_doc_version: null;
  external_id: string;
  attributes_version: 1;
};

export type statusType = "work_completed" | "ready_to_inspect" | "not_approved" | "in_dispute" | "closed" | "void" | "answered";

export type attributeType =
  | "assigned_to"
  | "assigned_to_type"
  | "description"
  | "due_date"
  | "location_description"
  | "trades"
  | "owner"
  | "issue_type"
  | "issue_type_id"
  | "root_cause"
  | "root_cause_id"
  | "title"
  | "status"
  | "sheet_metadata"
  | "lbs_location"
  | "answer"
  | "pushpin_attributes"
  | "snapshot_urn"
  | "close_version"
  | "comments_attributes"
  | "attachments_attributes"
  | "markup_metadata"
  | "updated_at"
  | "tags"
  | "collection_urn"
  | "custom_attributes"
  | "ng_issue_subtype_id";

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
    assigned_to: string | null;
    assigned_to_type: assignedToType | null;
    answer: string | null;
    answered_at: Date | null;
    answered_by: string | null;
    pushpin_attributes: pushpinAttibutesType | null;
    owner: string;
    issue_type_id: string | null;
    issue_type: "4" | null;
    issue_sub_type: null;
    root_cause_id: string | null;
    root_cause: "COORDINATION" | "DESIGN_CHANGE" | null;
    quality_urns: null;
    permitted_statuses: statusType[];
    permitted_attributes: attributeType[];
    comment_count: number;
    attachment_count: number;
    permitted_actions: ("add_comment" | "add_attachment")[];
    sheet_metadata: { is3D: boolean; sheetGuid: string; sheetName: string } | null;
    lbs_location: string | null;
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
