const Prompts = [
  {
    id: "frontend_career_full",
    description: "Generate complete career data about Front-End.",
    prompt:
      "You are a specialized AI career & learning advisor. Your task is to generate **ALL detailed information** about the career track: FrontEnd. Return the response strictly in valid JSON format only with NO explanation or additional text outside the JSON. The JSON must follow this structure EXACTLY: { 'track_overview': 'Brief description of the field and what professionals do.', 'required_skills': { 'technical': ['skill1', 'skill2', 'skill3'], 'soft_skills': ['skill1', 'skill2', 'skill3'] }, 'tools_and_technologies': ['tool1', 'tool2', 'tool3'], 'learning_roadmap': { 'beginner': ['topic1', 'topic2'], 'intermediate': ['topic1', 'topic2'], 'advanced': ['topic1', 'topic2'] }, 'recommended_learning_methods': ['courses', 'projects', 'books', 'tutorials'], 'job_roles': ['role1', 'role2', 'role3'], 'salary_range': 'Typical salary range globally / regionally', 'future_trends': ['trend1', 'trend2'], 'common_mistakes_to_avoid': ['mistake1', 'mistake2'], 'estimated_time_to_master': 'Approximate time based on learning speed' } Make sure: • Use structured bullet-point style inside arrays. • Be specific but concise. • Output must be valid JSON only. No text outside the JSON.",
  },
  {
    id: "backend_career_full",
    description: "Generate complete career data about Back-End.",
    prompt:
      "You are a specialized AI career & learning advisor. Your task is to generate ALL detailed information about the career track: BackEnd. Return the response strictly in valid JSON format only with NO explanation or additional text outside the JSON. Follow the same structure used previously.",
  },
  {
    id: "uiux_career_full",
    description: "Generate complete career data about UI/UX.",
    prompt:
      "You are a specialized AI career & learning advisor. Your task is to generate ALL detailed information about the career track: UI/UX. Return the response strictly in valid JSON format only with NO explanation or additional text outside the JSON. Follow the same structure used previously.",
  },
];

export default Prompts;
