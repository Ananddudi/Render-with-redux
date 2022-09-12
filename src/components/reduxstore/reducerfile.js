import { initialvalue, initialContent } from "./states";

export const reducer = (state = initialvalue, action) => {
  // if (action.type === "login") {
  //   return { ...state, show: true };
  // }
  // if (action.type === "register") {
  //   return { ...state, show: false };
  // }
  if (action.type === "maindash") {
    return { ...state, component: "MainDashboard", AdminDashboard: "" };
  }

  if (action.type === "resorce") {
    return { ...state, component: "Resource" };
  }
  if (action.type === "sett") {
    return { ...state, component: "Settings" };
  }
  if (action.type === "supp") {
    return { ...state, component: "Support" };
  }
  if (action.type === "logoutP") {
    return { ...state, logoutprop: true };
  }
  if (action.type === "logoutPfalse") {
    return { ...state, logoutprop: false };
  }
  if (action.type === "allow") {
    return { ...state, allowaccess: true };
  }
  if (action.type === "disallow") {
    return { ...state, allowaccess: false };
  }
  if (action.type === "load") {
    return { ...state, loading: true };
  }
  if (action.type === "notload") {
    return { ...state, loading: false };
  }
  if (action.type === "fPass") {
    return { ...state, forgotpass: true };
  }
  if (action.type === "fFail") {
    return { ...state, forgotpass: false };
  }
  // admin
  if (action.type === "admindash") {
    return {
      ...state,
      component: "",
      AdminDashboard: "admindashboard",
    };
  }
  if (action.type === "adminui") {
    return {
      ...state,
      AdminDashboard: "uicomponent",
      component: "",
    };
  }

  return state;
};

//admin
// export const adminReducer = (state = initialContent, action) => {
//   switch (action.type) {
//     case "adminaccess": {
//       return { ...state, adminaccess: true };
//     }
//     case "adminnoaccess": {
//       return { ...state, adminaccess: false };
//     }
//     case "homepage_save": {
//       return {
//         ...state,
//         homepage_first_text: action.firstText && action.firstText,
//         homepage_second_text: action.secondText && action.secondText,
//         banner_image: action.bannerImage && action.bannerImage,
//         homepage_youtube: action.homepageYoutube && action.homepageYoutube,
//         keyborad_section_text:
//           action.keyboardSectionText && action.keyboardSectionText,
//         keyboard_image: action.keyboardImage && action.keyboardImage,
//         faq_questions_answers: action.faqQuestions && action.faqQuestions,
//       };
//     }
//     case "dashboard": {
//       return {
//         ...state,
//         dashboardContent: {
//           welcome_text: action.welcome_text,
//           explain_video: action.explain_video,
//         },
//       };
//     }
//     case "supports": {
//       return {
//         ...state,
//         supportsection: {
//           head_text: action.head_text,
//           below_text: action.below_text,
//           forms: action.forms,
//           iframe_link: action.iframe_link,
//         },
//       };
//     }
//     case "resources": {
//       return {
//         ...state,
//         resorcesSection: {
//           youtube: action.youtube,
//           key_text: action.key_text,
//           key_image: action.key_image,
//         },
//       };
//     }

//     default: {
//       return { ...state };
//     }
//   }
// };

export const adminReducer = (state = initialContent, action) => {
  console.log("faqqqqqqqqqqqqq", action.payload);
  switch (action.type) {
    case "adminaccess": {
      return { ...state, adminaccess: true };
    }
    case "adminnoaccess": {
      return { ...state, adminaccess: false };
    }
    case "unload_loader": {
      return { ...state, unload_loader: false };
    }
    case "load_loader": {
      return { ...state, unload_loader: true };
    }
    case "hompage_data": {
      return {
        ...state,
        homepage_first_text:
          action.payload.firstText === ""
            ? "Watch the getting started video below for a quick how-to guide"
            : action.payload.firstText,
        homepage_second_text:
          action.payload.secondText === ""
            ? "Contact us through the live chat button on the bottom right of the screen if you have any questions or need help with anything. You can chat or do a video / screen share call."
            : action.payload.secondText,
        banner_image: action.payload.bannerImage && action.payload.bannerImage,
        homepage_youtube:
          action.payload.homepageYoutube === ""
            ? "d2cOXy4Qekg"
            : action.payload.homepageYoutube,
        keyborad_section_text:
          action.payload.keyboardSectionText === ""
            ? "Note: To upload images for screens or signs, create an account at imgbb.com. Upload images to your account and then navigate to your image within the RenderNow program and copy the “DIRECT LINK” to your image, then paste it into the logo field. Watch a quick tip video here: Upload Images Tip"
            : action.payload.keyboardSectionText,
        keyboard_image:
          action.payload.keyboardImage && action.payload.keyboardImage,
        back_image: action.payload.image && action.payload.image,
        faq_questions_answers:
          action.payload.faqQuestions && action.payload.faqQuestions,
        backgroundImage:
          action.payload.backgroundImage && action.payload.backgroundImage,
      };
    }
    case "dashboard": {
      return {
        ...state,
        dashboardContent: {
          welcome: action.payload.welcome && action.payload.welcome,
          welcome_text:
            action.payload.welcome_text && action.payload.welcome_text,
          explain_video:
            action.payload.explain_video && action.payload.explain_video,
        },
      };
    }
    case "support": {
      return {
        ...state,
        supportsection: {
          head_text: action.payload.head_text && action.payload.head_text,
          below_text: action.payload.below_text && action.payload.below_text,
          iframe_link:
            action.payload.iframe_link === ""
              ? "https://forms.monday.com/forms/embed/ed24ff35b9056bc8ee13f920d6c5ee74?r=use1"
              : action.payload.iframe_link,
          faq: action.payload.faq,
        },
      };
    }
    case "resorces": {
      return {
        ...state,
        resorcesSection: {
          youtube: action.payload.youtube && action.payload.youtube,
          key_text: action.payload.key_text && action.payload.key_text,
          key_image: action.payload.key_image && action.payload.key_image,
        },
      };
    }
    case "renders": {
      return {
        ...state,
        renderSection: {
          form: action.payload.form && action.payload.form,
        },
      };
    }

    case "home_message_true": {
      return {
        ...state,
        hompage_message: true,
      };
    }
    case "home_message_false": {
      return {
        ...state,
        hompage_message: false,
      };
    }
    case "dash_message_true": {
      return {
        ...state,
        dashboard_message: true,
      };
    }
    case "dash_message_false": {
      return {
        ...state,
        dashboard_message: false,
      };
    }
    case "render_message_true": {
      return {
        ...state,
        render_message: true,
      };
    }
    case "render_message_false": {
      return {
        ...state,
        render_message: false,
      };
    }
    case "support_message_true": {
      return {
        ...state,
        support_message: true,
      };
    }
    case "support_message_false": {
      return {
        ...state,
        support_message: false,
      };
    }
    case "res_message_true": {
      return {
        ...state,
        res_message: true,
      };
    }
    case "res_message_false": {
      return {
        ...state,
        res_message: false,
      };
    }

    default: {
      return { ...state };
    }
  }
};
