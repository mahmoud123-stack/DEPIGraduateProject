const API_KEY = "AIzaSyBS0DBzlOFEBwmaC7uDyZWoeduLpD4SCPs";
const GenerateTrackData = async (trackName) => {
  const Prompt = `
  You are a specialized AI career & learning advisor. Your task is to generate ALL detailed information about the career track: ${trackName}. Return the response strictly in valid JSON format only with NO explanation or additional text outside the JSON. The JSON must follow this structure EXACTLY: { 'track_overview': 'Brief description of the field and what professionals do.', 'required_skills': { 'technical': ['skill1', 'skill2', 'skill3'], 'soft_skills': ['skill1', 'skill2', 'skill3'] }, 'tools_and_technologies': ['tool1', 'tool2', 'tool3'], 'learning_roadmap': { 'beginner': ['topic1', 'topic2'], 'intermediate': ['topic1', 'topic2'], 'advanced': ['topic1', 'topic2'] }, 'recommended_learning_methods': ['courses', 'projects', 'books', 'tutorials'], 'job_roles': ['role1', 'role2', 'role3'], 'salary_range': 'Typical salary range globally / regionally', 'future_trends': ['trend1', 'trend2'], 'common_mistakes_to_avoid': ['mistake1', 'mistake2'], 'estimated_time_to_master': 'Approximate time based on learning speed' } , 
  "BasicInfo": {
    "TrackName": "track_name",
    "track_overview" : "trackOverview",
    "TrackTags" : ["tag" , "tag2" , "tag3"],
    "TrackClassification" : "Track_Classification",
    },
  "insights_for_charts": {
    "tools_usage": [
      { "tool": "tool_name", "usage_percent": "number" },
       {"average_learning_time_months" , }
    ],
  
    "job_demand_last_5_years": [
      { "year": "YYYY", "demand": "number" }
    ],
  
    "average_salary": {
      "global": "salary_range",
      "middle_east": "salary_range"
    },
  
    "learning_difficulty": [
      { "skill": "skill_name", "difficulty": "1-10" }
    ],
  
    "best_learning_resources": [
      { "name": "resource_name", "monthly_users": "number" }
    ],
  
    "future_score": "1-10",
  
    "suggested_chart_types": {
      "tools_usage": "chart_type",
      …
    },
  
    "demand_by_country": [
      { "country": "country_name", "demand_percent": "number" }
    ],
  
    "average_learning_time_months": [
      { "skill": "skill_name", "months_to_learn": "number" }
    ],
  
    "popular_projects_for_portfolio": [
      { "project": "project_name", "complexity": "1-10" }
    ],
  
    "framework_comparison": [
      { "framework": "framework_name", "performance_score": "1-10", "community_score": "1-10" }
    ],
  
    "remote_vs_onsite_jobs": [
      { "type": "remote", "percentage": "number" },
      { "type": "onsite", "percentage": "number" }
    ],
  
    "market_growth_forecast": [
      { "year": "YYYY", "growth_percent": "number" }
    ],
  },
    "tools" : [
     {"tool_Name" : "toolName" , "toolClassification" : "tool_Class" , "Learn_Reason" : "reason" , "bestWayToLearn" : "learningWay"},
    ],
     "Hardskills" : [
      {"skill_Name" : "skillName" , "skillClassification" : "skill_Class" , "Learn_Reason" : "reason" , "bestWayToLearn" : "learningWay"},
     ],
     "Softskills" : [
      {"skill_Name" : "skillName" , "skillClassification" : "skill_Class" , "Learn_Reason" : "reason" , "bestWayToLearn" : "learningWay"},
     ],
     "common_mistakes_to_avoid" : [
     {"mistake" : "Mistake" , "HowToAvoid" : "Describe how to avoid"},
     ],

     "estimated_time_to_master" : [
     {"level" : "Level" , "Time" : "years" , "Ability" : "My Ability After This Time" , "ShouldLearn" : "what i ShouldLearn in this time "},
     ],

     "future_trends" : [
     {"trend": "TrendName" , "TrendBrief" : "brief" , "BriefAboutIt"}
     ],

     "learning_roadmap" : [
     {"beginner" : {"step" : "stepNumber" , "stepTitle" : "Title", "stepDescription" : 'stepDesc' } },
     {"intermediate" : {"step" : "stepNumber" , "stepTitle" : "Title", "stepDescription" : 'stepDesc'}},
     {"advanced" : {"step" : "stepNumber" , "stepTitle" : "Title", "stepDescription" : 'stepDesc'}},
     ],

     "recommended_learning_methods" : [],
     "JobRoles" : [
     {"role" : "Role" , "roleBrief" : "Brief about this role"},
     ],
    "salary_range" : [
    "level" :  "level as Junior or senior" , {
    "region" : "Region",
    "salary_range" : "Range"
    } , {"WorldRange" : {"level" : "Level" , "LevelRange" : "Range"}}],

    - mindset: { short: string, details: string[] }
- core_responsibilities: string[] 
- must_have_skills: { technical: string[], level_expectations: { junior: string[], mid: string[], senior: string[] } }
- nice_to_have: string[]
- tools_and_stack: string[]
- experience_and_education: { min_years: number, recommended_background: string[] }
- deliverables_in_first_3_months: string[]
- interview_focus: { technical_tasks: string[], behavioral_questions: string[] }
- soft_skills: string[]
- hiring_criteria_scorecard: { factors: { "<factor_name>": {"weight": number, "description": string } }, pass_threshold_percent: number }
- portfolio_and_cv_requirements: { live_projects: string[], repo_expectations: string[], case_study_template: string }
- compensation_guidance: { currency: string, range_by_location: { "<location>": {"min": number, "max": number } } }
- cultural_fit_and_values: string[]
- red_flags: string[]
- perks_and_benefits_that_appeal: string[]
- example_candidate_summary: { name: string, level: string, headline: string, top_3_strengths: string[], top_2_gaps: string[] }

Instructions:
1. Only output a single JSON object exactly matching the keys above. Fill values; do not leave keys empty.
2. If any field is not applicable, provide a short string like "N/A" or an empty array.
3. Make language concise and actionable. Use bullet-like arrays where helpful.
4. If a job_title and context are provided, tailor examples to that job; otherwise produce a neutral generic profile.
5. Do not print explanations, examples outside the JSON, or markdown.

  Make sure: • Use structured bullet-point style inside arrays. • Be specific but concise. • Output must be valid JSON only. No text outside the JSON.",  
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: Prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No valid response from model";

    const match = reply.match(/\{[\s\S]*\}/);
    if (!match) {
      return {
        success: false,
        error: "No JSON found in AI response",
        raw: reply,
      };
    }

    let FinalResponse;
    try {
      FinalResponse = JSON.parse(match[0]);
    } catch (err) {
      return {
        success: false,
        error: "Invalid JSON format",
        raw: reply,
      };
    }

    return { success: true, data: FinalResponse };
  } catch (error) {
    return { success: false, error: error.message || error };
  }
};

module.exports = { GenerateTrackData };
