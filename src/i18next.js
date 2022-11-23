import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import common_en from "./translations/en/common.json";
import common_ta from "./translations/ta/common.json";
import common_si from "./translations/si/common.json";

import employee_en from "./translations/en/employee.json";
import employee_ta from "./translations/ta/employee.json";
import employee_si from "./translations/si/employee.json";

const Languages = ["en", "ta", "si"];
const resources = {
    en: {
        common: common_en,
        employee: employee_en
    },
    ta: {
        common: common_ta,
        employee: employee_ta
    },
    si: {
        common: common_si,
        employee: employee_si
    }
}

export default i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: true,
        whitelist: Languages,
        interpolation: {
            escapeValue: false,
        },
        ns: ['common', 'employee'],
        // Set default namespace
        defaultNS: "common",
        resources
    });