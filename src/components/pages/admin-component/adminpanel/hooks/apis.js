export const homepageapi = async (
  data,
  youtubelinks = "d2cOXy4Qekg",
  faqstate,
  dispatch
) => {
  const f_text = data.firstText;
  const s_text = data.secondText;
  const image = data.sideimage;
  const youtube = youtubelinks;
  const key_image = data.key_image;
  const back_image = data.back_image;
  const key_text = data.key_text;

  const post = await fetch(
    "https://rvent-render-backend.herokuapp.com/postHomeGoals",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstText: f_text,
        secondText: s_text,
        sideimage: image,
        keyText: key_text,
        keyImage: key_image,
        youtubeLink: youtube,
        faq: faqstate,
        backgroundImage: back_image,
      }),
    }
  );

  if (post.status === 201) {
    dispatch({ type: "home_message_true" });
    setTimeout(() => {
      dispatch({ type: "home_message_false" });
    }, 5000);
  }
};

export const dashboardpageapi = async (
  data,
  youtubelinks = "d2cOXy4Qekg",
  dispatch
) => {
  const w_text = data.welcome;
  const f_text = data.welcome_text;
  const youtube = youtubelinks;

  const post = await fetch(
    "https://rvent-render-backend.herokuapp.com/postDashboardGoals",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        welcome: w_text,
        welcomeText: f_text,
        youtubeLink: youtube,
      }),
    }
  );
  if (post.status === 201) {
    dispatch({ type: "dash_message_true" });
    setTimeout(() => {
      dispatch({ type: "dash_message_false" });
    }, 5000);
  }
};

export const renderpageapi = async (data, dispatch) => {
  const post = await fetch(
    "https://rvent-render-backend.herokuapp.com/postRenderGoals",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link: data }),
    }
  );
  if (post.status === 201) {
    dispatch({ type: "render_message_true" });
    setTimeout(() => {
      dispatch({ type: "render_message_false" });
    }, 5000);
  }
};

export const supportpageapi = async (data, faqstate, dispatch) => {
  const main = data.main;
  const below = data.below;
  const link = data.link;

  const post = await fetch(
    "https://rvent-render-backend.herokuapp.com/postSupportGoals",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        main: main,
        below: below,
        link: link,
        faq: faqstate,
      }),
    }
  );
  if (post.status === 201) {
    dispatch({ type: "support_message_true" });
    setTimeout(() => {
      dispatch({ type: "support_message_false" });
    }, 5000);
  }
};

export const resourcespageapi = async (
  data,
  youtubelinks = "d2cOXy4Qekg",
  dispatch
) => {
  const link = youtubelinks;
  const text = data.text;
  const image = data.image;

  const post = await fetch(
    "https://rvent-render-backend.herokuapp.com/postResourceGoals",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        youtubeLink: link,
        image: image,
      }),
    }
  );
  if (post.status === 201) {
    dispatch({ type: "res_message_true" });
    setTimeout(() => {
      dispatch({ type: "res_message_false" });
    }, 5000);
  }
};

export const getalldata = async (dispatch) => {
  const data = await fetch(
    "https://rvent-render-backend.herokuapp.com/getHomeGoals"
  );
  const data2 = await fetch(
    "https://rvent-render-backend.herokuapp.com/getDashboardGoals"
  );
  const data3 = await fetch(
    "https://rvent-render-backend.herokuapp.com/getResourceGoals"
  );
  const data4 = await fetch(
    "https://rvent-render-backend.herokuapp.com/getRenderGoals"
  );
  const data5 = await fetch(
    "https://rvent-render-backend.herokuapp.com/getSupportGoals"
  );

  const data_result = await data.json();
  const data_result2 = await data2.json();
  const data_result3 = await data3.json();
  const data_result4 = await data4.json();
  const data_result5 = await data5.json();

  console.log("datasss", data_result5);

  if (data_result) {
    dispatch({
      type: "hompage_data",
      payload: {
        firstText: data_result.firstText,
        secondText: data_result.secondText,
        bannerImage: data_result.sideimage,
        homepageYoutube: data_result.youtubeLink,
        keyboardSectionText: data_result.keyText,
        keyboardImage: data_result.keyImage,
        faqQuestions: data_result.faq,
        backgroundImage: data_result.backgroundImage,
      },
    });
  }
  if (data_result2) {
    dispatch({
      type: "dashboard",
      payload: {
        welcome: data_result2.welcome,
        welcome_text: data_result2.welcomeText,
        explain_video: data_result2.youtubeLink,
      },
    });
  }
  if (data_result5) {
    dispatch({
      type: "support",
      payload: {
        head_text: data_result5.main,
        below_text: data_result5.below,
        iframe_link: data_result5.link,
        faq: data_result5.faq,
      },
    });
  }
  if (data_result3) {
    dispatch({
      type: "resorces",
      payload: {
        youtube: data_result3.youtubeLink,
        key_text: data_result3.text,
        key_image: data_result3.image,
      },
    });
  }
  if (data_result4) {
    dispatch({
      type: "renders",
      payload: { form: data_result4.link },
    });
  }
};
