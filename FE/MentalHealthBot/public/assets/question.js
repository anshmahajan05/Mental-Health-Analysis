const questions = [
    {
        "question": "How many employees does your company or organization have?",
        "option": [
            "1-5",
            "6-25",
            "26-100",
            "100-500",
            "500-1000",
            "More than 1000"
        ],
        "variable": {
            "name": "num_employees",
            "options": {
                "1-5": 1,
                "6-25": 6,
                "26-100": 26,
                "100-500": 101,
                "500-1000": 501,
                "More than 1000": 1001
            }
        }
    },
    {
        "question": "Is your employer primarily a tech company/organization?",
        "option": [
            "Yes",
            "No"
        ],
        "variable": {
            "name": "tech_company_or_role",
            "options": {
                "Yes": 1,
                "No": 2
            }
        }
    },
    {
        "question": "Does your employer provide mental health benefits as part of healthcare coverage?",
        "option": [
            "Not eligible for coverage / N/A",
            "No",
            "Yes",
            "I don't know "
        ],
        "variable": {
            "name": "cep_benefits",
            "options": {
                "Yes": 1,
                "I don't know": 2,
                "No": 3,
                "Not eligible for coverage / N/A": -1
            }
        }
    },
    {
        "question": "Do you know the options for mental health care available under your employer-provided coverage?",
        "option": [
            "No",
            "Yes",
            "I am not sure"
        ],
        "variable": {
            "name": "cep_know_options",
            "options": {
                "Yes": 1,
                "I am not sure": 2,
                "No": 3
            }
        }
    },
    {
        "question": "Has your employer ever formally discussed mental health (for example, as part of a wellness campaign or other official communication)?",
        "option": [
            "No",
            "Yes",
            "I don't know"
        ],
        "variable": {
            "name": "cep_discuss",
            "options": {
                "Yes": 1,
                "I don't know": 2,
                "No": 3
            }
        }
    },
    {
        "question": "Does your employer offer resources to learn more about mental health concerns and options for seeking help?",
        "option": [
            "No",
            "Yes",
            "I don't know"
        ],
        "variable": {
            "name": "cep_learn",
            "options": {
                "Yes": 1,
                "I don't know": 2,
                "No": 3
            }
        }
    },
    {
        "question": "Is your anonymity protected if you choose to take advantage of mental health or substance abuse treatment resources provided by your employer?",
        "option": [
            "No",
            "Yes",
            "I don't know"
        ],
        "variable": {
            "name": "cep_anon",
            "options": {
                "Yes": 1,
                "I don't know": 2,
                "No": 3
            }
        }
    },
    {
        "question": "If a mental health issue prompted you to request a medical leave from work, asking for that leave would be:",
        "option": [
            "Very easy",
            "Somewhat easy",
            "Neither easy nor difficult",
            "Very difficult",
            "Somewhat difficult",
            "I don't know"
        ],
        "variable": {
            "name": "cep_mh_leave",
            "options": {
                "Very easy": 1,
                "Somewhat easy": 2,
                "Neither easy nor difficult": 3,
                "I don't know": 3,
                "Somewhat difficult": 4,
                "Very difficult": 5
            }
        }
    },
    {
        "question": "Do you think that discussing a mental health disorder with your employer would have negative consequences?",
        "option": [
            "No",
            "Maybe",
            "Yes"
        ],
        "variable": {
            "name": "cep_mh_ncsq",
            "options": {
                "Yes": 1,
                "Maybe": 2,
                "No": 3
            }
        }
    },
    {
        "question": "Do you think that discussing a physical health issue with your employer would have negative consequences?",
        "option": [
            "No",
            "Maybe",
            "Yes"
        ],
        "variable": {
            "name": "cep_ph_ncsq",
            "options": {
                "Yes": 1,
                "Maybe": 2,
                "No": 3
            }
        }
    },
    {
        "question": "Would you feel comfortable discussing a mental health disorder with your coworkers?",
        "option": [
            "No",
            "Maybe",
            "Yes"
        ],
        "variable": {
            "name": "cep_comf_cw",
            "options": {
                "Yes": 1,
                "Maybe": 2,
                "No": 3
            }
        }
    },
    {
        "question": "Would you feel comfortable discussing a mental health disorder with your direct supervisor(s)?",
        "option": [
            "No",
            "Maybe",
            "Yes"
        ],
        "variable": {
            "name": "cep_comf_sup",
            "options": {
                "Yes": 1,
                "Maybe": 2,
                "No": 3
            }
        }
    },
    {
        "question": "Do you feel that your employer takes mental health as seriously as physical health?",
        "option": [
            "No",
            "I don't know",
            "Yes"
        ],
        "variable": {
            "name": "cep_serious",
            "options": {
                "Yes": 1,
                "I don't know": 2,
                "No": 3
            }
        }
    },
    {
        "question": "Have you heard of or observed negative consequences for co-workers who have been open about mental health issues in your workplace?",
        "option": [
            "No",
            "Yes"
        ],
        "variable": {
            "name": "cep_others_ncsq",
            "options": {
                "Yes": 1,
                "No": 2
            }
        }
    },
    {
        "question": "Do you have previous employers?",
        "option": [
            "No",
            "Yes"
        ],
        "variable": {
            "name": "pep_have",
            "options": {
                "Yes": 1,
                "No": 2
            }
        }
    },
    {
        "question": "Have your previous employers provided mental health benefits?",
        "option": [
            "No, none did",
            "Yes, they all did",
            "I don't know",
            "Some did"
        ],
        "variable": {
            "name": "pep_benefits",
            "options": {
                "Yes, they all did": 1,
                "Some did": 2,
                "I don't know": 3,
                "No, none did": 4
            }
        }
    },
    {
        "question": "Were you aware of the options for mental health care provided by your previous employers?",
        "option": [
            "N/A (not currently aware)",
            "I was aware of some",
            "Yes, I was aware of all of them",
            "No, I only became aware later"
        ],
        "variable": {
            "name": "pep_know_options",
            "options": {
                "Yes, I was aware of all of them": 1,
                "I was aware of some": 2,
                "No, I only became aware later": 3,
                "N/A (not currently aware)": 4
            }
        }
    },
    {
        "question": "Did your previous employers ever formally discuss mental health (as part of a wellness campaign or other official communication)?",
        "option": [
            "I don't know",
            "None did",
            "Some did",
            "Yes, they all did"
        ],
        "variable": {
            "name": "pep_discuss",
            "options": {
                "Yes, they all did": 1,
                "Some did": 2,
                "I don't know": 3,
                "None did": 4
            }
        }
    },
    {
        "question": "Did your previous employers provide resources to learn more about mental health issues and how to seek help?",
        "option": [
            "None did",
            "Some did",
            "Yes, they all did",
            "I don't know"
        ],
        "variable": {
            "name": "pep_learn",
            "options": {
                "Yes, they all did": 1,
                "Some did": 2,
                "I don't know": 3,
                "None did": 4
            }
        }
    },
    {
        "question": "Was your anonymity protected if you chose to take advantage of mental health or substance abuse treatment resources with previous employers?",
        "option": [
            "I don't know",
            "Yes, always",
            "Sometimes",
            "No"
        ],
        "variable": {
            "name": "pep_anon",
            "options": {
                "Yes, always": 1,
                "Sometimes": 2,
                "I don't know": 3,
                "No": 4
            }
        }
    },
    {
        "question": "Do you think that discussing a mental health disorder with previous employers would have negative consequences?",
        "option": [
            "I don't know",
            "Some of them",
            "Yes, all of them",
            "None of them"
        ],
        "variable": {
            "name": "pep_mh_ncsq",
            "options": {
                "Yes, all of them": 1,
                "Some of them": 2,
                "I don't know": 3,
                "None of them": 4
            }
        }
    },
    {
        "question": "Do you think that discussing a physical health issue with previous employers would have negative consequences?",
        "option": [
            "Some of them",
            "Yes, all of them",
            "None of them"
        ],
        "variable": {
            "name": "pep_ph_ncsq",
            "options": {
                "Yes, all of them": 1,
                "Some of them": 2,
                "None of them": 3
            }
        }
    },
    {
        "question": "Would you have been willing to discuss a mental health issue with your previous co-workers?",
        "option": [
            "Some of my previous employers",
            "No, at none of my previous employers",
            "Yes, at all of my previous employers"
        ],
        "variable": {
            "name": "pep_comf_cw",
            "options": {
                "Yes, at all of my previous employers": 1,
                "Some of my previous employers": 2,
                "No, at none of my previous employers": 3
            }
        }
    },
    {
        "question": "Would you have been willing to discuss a mental health issue with your direct supervisor(s)?",
        "option": [
            "Some of my previous employers",
            "I don't know ",
            "No, at none of my previous employers",
            "Yes, at all of my previous employers"
        ],
        "variable": {
            "name": "pep_comf_sup",
            "options": {
                "Yes, at all of my previous employers": 1,
                "Some of my previous employers": 2,
                "I don't know": 3,
                "No, at none of my previous employers": 4
            }
        }
    },
    {
        "question": "Did you feel that your previous employers took mental health as seriously as physical health?",
        "option": [
            "Some did",
            "I don't know ",
            "None did",
            "Yes, they all did"
        ],
        "variable": {
            "name": "pep_serious",
            "options": {
                "Yes, they all did": 1,
                "Some did": 2,
                "I don't know": 3,
                "None did": 4
            }
        }
    },
    {
        "question": "Did you hear of or observe negative consequences for co-workers with mental health issues in your previous workplaces?",
        "option": [
            "None of them",
            "Some of them",
            "Yes, all of them"
        ],
        "variable": {
            "name": "pep_others_ncsq",
            "options": {
                "Yes, all of them": 1,
                "Some of them": 2,
                "None of them": 3
            }
        }
    },
    {
        "question": "Would you be willing to bring up a physical health issue with a potential employer in an interview?",
        "option": [
            "Maybe",
            "No",
            "Yes"
        ],
        "variable": {
            "name": "fep_ph_willing",
            "options": {
                "Yes": 1,
                "Maybe": 2,
                "No": 3
            }
        }
    },
    {
        "question": "Would you bring up a mental health issue with a potential employer in an interview?",
        "option": [
            "Maybe",
            "No",
            "Yes"
        ],
        "variable": {
            "name": "fep_mh_willing",
            "options": {
                "Yes": 1,
                "Maybe": 2,
                "No": 3
            }
        }
    },
    {
        "question": "Do you feel that being identified as a person with a mental health issue would hurt your career?",
        "option": [
            "Maybe",
            "No, I don't think it would",
            "Yes, I think it would",
            "No, it has not",
            "Yes, it has"
        ],
        "variable": {
            "name": "hurt_career",
            "options": {
                "Yes, it has": 1,
                "Yes, I think it would": 2,
                "Maybe": 3,
                "No, I don't think it would": 4,
                "No, it has not": 5
            }
        }
    },
    {
        "question": "Do you think that team members/co-workers would view you more negatively if they knew you suffered from a mental health issue?",
        "option": [
            "Maybe",
            "No, I don't think they would",
            "Yes, I think they would",
            "No, they do not",
            "Yes, they do"
        ],
        "variable": {
            "name": "cw_view_neg",
            "options": {
                "Yes, they do": 1,
                "Yes, I think they would": 2,
                "Maybe": 3,
                "No, I don't think they would": 4,
                "No, they do not": 5
            }
        }
    },
    {
        "question": "How willing would you be to share with friends and family that you have a mental illness?",
        "option": [
            "Somewhat open",
            "Not applicable to me (I do not have a mental illness)",
            "Very open",
            "Not open at all",
            "Neutral",
            "Somewhat not open"
        ],
        "variable": {
            "name": "comf_ff",
            "options": {
                "Very open": 1,
                "Somewhat open": 2,
                "Neutral": 3,
                "Somewhat not open": 4,
                "Not open at all": 5,
                "Not applicable to me (I do not have a mental illness)": -1
            }
        }
    },
    {
        "question": "Have you observed or experienced an unsupportive or badly handled response to a mental health issue in your current or previous workplace?",
        "option": [
            "Maybe/Not sure",
            "No",
            "Yes, I experienced",
            "Yes, I observed"
        ],
        "variable": {
            "name": "neg_response",
            "options": {
                "Yes, I experienced": 1,
                "Yes, I observed": 2,
                "Maybe/Not sure": 3,
                "No": 4
            }
        }
    },
    {
        "question": "Do you have a family history of mental illness?",
        "option": [
            "I don't know",
            "No",
            "Yes"
        ],
        "variable": {
            "name": "mh_fam_hist",
            "options": {
                "Yes": 1,
                "I don't know": 2,
                "No": 3
            }
        }
    },
    {
        "question": "Have you had a mental health disorder in the past?",
        "option": [
            "Maybe",
            "No",
            "Yes"
        ],
        "variable": {
            "name": "mh_hist",
            "options": {
                "Yes": 1,
                "Maybe": 2,
                "No": 3
            }
        }
    },
    {
        "question": "Do you currently have a mental health disorder?",
        "option": [
            "Maybe",
            "No",
            "Yes"
        ],
        "variable": {
            "name": "mh_cur",
            "options": {
                "Yes": 1,
                "Maybe": 2,
                "No": 3
            }
        }
    },
    {
        "question": "If yes, what condition(s) have you been diagnosed with?",
        "option": "",
        "variable": {
            "name": "mh_cur_name_yes",
            "options": ""
        }
    },
    {
        "question": "If maybe, what condition(s) do you believe you have?",
        "option": "",
        "variable": {
            "name": "mh_cur_name_maybe",
            "options": {}
        }
    },
    {
        "question": "Have you been diagnosed with a mental health condition by a medical professional?",
        "option": [
            "No",
            "Yes"
        ],
        "variable": {
            "name": "mh_diag_pro",
            "options": {
                "Yes": 1,
                "No": 2
            }
        }
    },
    {
        "question": "If so, what condition(s) were you diagnosed with?",
        "option": "",
        "variable": {
            "name": "mh_diag_pro_name",
            "options": ""
        }
    },
    {
        "question": "Have you ever sought treatment for a mental health issue from a mental health professional?",
        "option": [
            "No",
            "Yes"
        ],
        "variable": {
            "name": "sought_treat",
            "options": {
                "Yes": 1,
                "No": 2
            }
        }
    },
    {
        "question": "If you have a mental health issue, do you feel that it interferes with your work when being treated effectively?",
        "option": [
            "Not applicable to me",
            "Rarely",
            "Sometimes",
            "Never",
            "Often"
        ],
        "variable": {
            "name": "work_affect_effect",
            "options": {
                "Often": 1,
                "Sometimes": 2,
                "Rarely": 3,
                "Never": 4,
                "Not applicable to me": -1
            }
        }
    },
    {
        "question": "If you have a mental health issue, do you feel that it interferes with your work when NOT being treated effectively?",
        "option": [
            "Not applicable to me",
            "Rarely",
            "Sometimes",
            "Never",
            "Often"
        ],
        "variable": {
            "name": "work_affect_ineffect",
            "options": {
                "Often": 1,
                "Sometimes": 2,
                "Rarely": 3,
                "Never": 4,
                "Not applicable to me": -1
            }
        }
    },
    {
        "question": "What is your age?",
        "option": "",
        "variable": {
            "name": "age",
            "options": ""
        }
    },
    {
        "question": "What is your gender?",
        "option": [
            "Male",
            "Female",
            "Others"
        ],
        "variable": {
            "name": "gender",
            "options": {
                "Male": 1,
                "Female": 2,
                "Others": 3
            }
        }
    },
    {
        "question": "What country do you work in?",
        "option": [
            "United Kingdom",
            "United States of America",
            "Canada",
            "Germany",
            "Netherlands",
            "Australia",
            "France",
            "Belgium",
            "Brazil",
            "Denmark",
            "Sweden",
            "Russia",
            "Spain",
            "India",
            "United Arab Emirates",
            "Mexico",
            "Switzerland",
            "Norway",
            "Argentina",
            "Ireland",
            "Italy",
            "Colombia",
            "Czech Republic",
            "Vietnam",
            "Finland",
            "Bulgaria",
            "South Africa",
            "Slovakia",
            "Bangladesh",
            "Pakistan",
            "New Zealand",
            "Afghanistan",
            "Poland",
            "Other",
            "Iran",
            "Hungary",
            "Israel",
            "Japan",
            "Ecuador",
            "Bosnia and Herzegovina",
            "Austria",
            "Romania",
            "Chile",
            "Estonia"
        ],
        "variable": {
            "name": "work_country",
            "options": {
                "United Kingdom": 0,
                "United States of America": 1,
                "Canada": 2,
                "Germany": 3,
                "Netherlands": 4,
                "Australia": 5,
                "France": 6,
                "Belgium": 7,
                "Brazil": 8,
                "Denmark": 9,
                "Sweden": 10,
                "Russia": 11,
                "Spain": 12,
                "India": 13,
                "United Arab Emirates": 14,
                "Mexico": 15,
                "Switzerland": 16,
                "Norway": 17,
                "Argentina": 18,
                "Ireland": 19,
                "Italy": 20,
                "Colombia": 21,
                "Czech Republic": 22,
                "Vietnam": 23,
                "Finland": 24,
                "Bulgaria": 25,
                "South Africa": 26,
                "Slovakia": 27,
                "Bangladesh": 28,
                "Pakistan": 29,
                "New Zealand": 30,
                "Afghanistan": 31,
                "Poland": 32,
                "Other": 33,
                "Iran": 34,
                "Hungary": 35,
                "Israel": 36,
                "Japan": 37,
                "Ecuador": 38,
                "Bosnia and Herzegovina": 39,
                "Austria": 40,
                "Romania": 41,
                "Chile": 42,
                "Estonia": 43
            }
        }
    },
    {
        "question": "Do you work remotely?",
        "option": [
            "Sometimes",
            "Never",
            "Always"
        ],
        "variable": {
            "name": "work_remote",
            "options": {
                "Always": 1,
                "Sometimes": 2,
                "Never": 3
            }
        }
    }
]

export default questions;