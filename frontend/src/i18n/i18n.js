import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLanguage = localStorage.getItem("lang");

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        home: "Home",
        register: "Register",
        login: "Login",
        button: "Change language",
        whereAreYouGoing: "Where are you going?",
        search: "search",
        loading: "Loading",
        dashboard: "My dashboard", 
        welcome: "Welcome",
        logout: "Logout",
        login: "Login",
        properties: "properties",
        property: "property",
        Mys: "My",
        My: "My",
        bookings: "bookings",
        New: "New",
        View: "View",
        Username: "Username",
        Name: "Name",
        Surname: "Surname",
        Birthdate: "Birthdate",
        Account: "Account",
        created: "created",
        Host: "Host",
        profile: "profile"

      }
    },
    es: {
      translation: {
        welcome: "Bienvenido",
        home: "Casa",
        register: "Registrarse",
        login: "Inicio Sesión",
        button: "Cambiar idioma",
        whereAreYouGoing: "¿A dónde vas?",
        search: "buscar",
        loading: "Cargando",
        dashboard: "Mi panel de control", 
        welcome: "Bienvenido",
        logout: "Cerrar sesión",
        login: "Iniciar sesión",
        properties: "alojamientos",
        property: "alojamiento",
        Mys: "Mis",
        My: "Mi",
        bookings: "reservas",
        New: "Nuevo",
        View: "Ver",
        Username: "Nombre de usuario",
        Name: "Nombre",
        Surname: "Apellidos",
        Birthdate: "Fecha de nacimiento",
        Account: "Cuenta",
        created: "creada",
        Host: "Anfitrión",
        profile: "perfíl"
      }
    }
  },
  lng: savedLanguage || "es",   // Si hay un idioma en el localStorage utilizamos ese, sino castellano
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;