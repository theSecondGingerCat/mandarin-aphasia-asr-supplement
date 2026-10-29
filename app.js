const results = [
  { model: "MiniMax ASR-1.0", condition: "Q0", n: 912, cer: 21.2446, wer: 29.7043, noteZh: "ASR-1.0 仅接受音频，不能接受文字提示，因此无法运行 Q1/Q2。", noteEn: "ASR-1.0 accepts audio only and does not accept text prompts, so Q1/Q2 cannot be run." },
  { model: "Qwen3-ASR-1.7B", condition: "Q0", n: 939, cer: 20.6317, wer: 28.0243, noteZh: "—", noteEn: "—" },
  { model: "Qwen3-ASR-1.7B", condition: "Q1", n: 939, cer: 20.1766, wer: 27.4763, noteZh: "—", noteEn: "—" },
  { model: "Qwen3-ASR-1.7B", condition: "Q2", n: 939, cer: 19.9884, wer: 27.1260, noteZh: "—", noteEn: "—" },
  { model: "Step-Audio-R1.1", condition: "Q1", n: 939, cer: 29.7077, wer: 35.2092, noteZh: "该模型在无提示词条件下转写混乱，无法计算相关指标。", noteEn: "Under the no-prompt condition, this model produced disordered transcriptions, so the corresponding metrics could not be computed." },
  { model: "Step-Audio-R1.1", condition: "Q2", n: 939, cer: 24.0952, wer: 29.7464, noteZh: "该模型在无提示词条件下转写混乱，无法计算相关指标。", noteEn: "Under the no-prompt condition, this model produced disordered transcriptions, so the corresponding metrics could not be computed." },
  { model: "Gemini 3.1 Pro Preview", condition: "Q0", n: 939, cer: 25.3926, wer: 34.2865, noteZh: "—", noteEn: "—" },
  { model: "Gemini 3.1 Pro Preview", condition: "Q1", n: 939, cer: 50.8662, wer: 56.0682, noteZh: "—", noteEn: "—" },
  { model: "Gemini 3.1 Pro Preview", condition: "Q2", n: 939, cer: 58.0006, wer: 63.2506, noteZh: "—", noteEn: "—" },
  { model: "NVIDIA Audio Flamingo Next", condition: "Q0", n: 939, cer: 160.2006, wer: 99.2885, noteZh: "—", noteEn: "—" },
  { model: "NVIDIA Audio Flamingo Next", condition: "Q1", n: 939, cer: 126.3962, wer: 138.0858, noteZh: "—", noteEn: "—" },
  { model: "NVIDIA Audio Flamingo Next", condition: "Q2", n: 939, cer: 159.1808, wer: 200.4601, noteZh: "—", noteEn: "—" }
];

const q1Zh = `这是一段中文临床语言评估中的自然口语转写，可能包含方言口音、停顿、重复、自我修正和不完整词。请尽量按音频内容逐字转写，不要总结，不要补写没有听到的内容。

你的唯一任务是听写音频，不是与用户对话，也不是整理文字草稿或分析临床语言。只依据音频中实际听到的语音输出转写正文，不得根据任务名称、图片、故事常识或其他音频外信息推断、补全或改写。

输出必须严格遵守以下规则：
1. 从第一个字开始就是实际转写内容，到最后一个字结束也是实际转写内容。直接开始听写，不要先确认任务、介绍结果、说明方法或重复本提示词。
2. 只输出一个连续纯文本版本。不得同时提供逐句版、段落版、时间轴版或其他重复版本；不得把同一段转写再输出一遍。
3. 不得添加任何前言、结语、标题、转写说明、免责声明、建议、分析或后续协助。禁止出现由你添加的“以下是转写录音”“以下是转写内容”“根据您提供的音频”“已为您整理”“逐字转写结果”“转写完毕”等旁白。
4. 不得添加说话人标签或角色名称，包括“男：”“女：”“男声：”“女声：”“患者：”“医生：”“受试者：”“评估者：”“说话人1：”“Speaker 1:”等。即使存在多人对话，也只按实际发言顺序连续转写所说的话，不推断性别、身份或角色；实际说出的“嗯”“啊”等回应仍须保留。
5. 不得添加时间戳、时间范围、序号、项目符号、Markdown 标题、加粗、表格、代码块、引用格式、JSON 或包裹整段正文的引号。
6. 不得添加任何括号、方括号或尖括号形式的注释，不得写“（停顿）”“[笑声]”“（听不清）”“（方言）”“（注：……”等声音事件、动作、解释或猜测。无语音的停顿和背景声不转换成文字标签。
7. 保留实际语音中的重复、语气词、口头禅、自我修正和未说完的词句，不为了通顺而删减、补全或改成书面语；不要把口误按常识纠正。不能确定的内容不要猜测或补写。
8. 仅可使用必要的普通标点帮助断句。不要用省略号、破折号或换行专门标记无声时长，不要输出空白时间段。

上述禁止项约束的是你额外添加的内容；如果说话人确实在音频中说出了相关词句，应当按原话转写。提交前在内部检查并去除你自行添加的所有旁白、标签和格式，只提交转写正文，不输出检查过程。`;

const q1En = `This is a transcription task for natural speech from a Chinese clinical language assessment. The audio may contain dialectal accents, pauses, repetitions, self-corrections, and incomplete words. Transcribe the audio as verbatim as possible. Do not summarize or add anything that is not heard.

Your only task is to transcribe the audio. Do not converse with the user, organize a draft, or analyze the clinical language. Output only the transcription text based on speech actually heard in the audio. Do not infer, complete, or rewrite from the task name, pictures, common story knowledge, or any information outside the audio.

Follow these output rules strictly:
1. The first character must be the actual transcription, and the last character must also be actual transcription. Start transcribing directly; do not confirm the task, introduce the result, explain the method, or repeat this prompt.
2. Output one continuous plain-text version only. Do not provide sentence-level, paragraph-level, timestamped, or other duplicate versions; do not output the same transcription twice.
3. Do not add an introduction, conclusion, title, transcription note, disclaimer, suggestion, analysis, or follow-up assistance. Do not add narration such as “Here is the transcription,” “Based on the audio,” or “Transcription complete.”
4. Do not add speaker labels or role names such as “Male:”, “Female:”, “Patient:”, “Doctor:”, “Participant:”, “Evaluator:”, or “Speaker 1:”. Even if several people speak, transcribe their words continuously in the order heard without inferring gender, identity, or role. Preserve actual responses such as “嗯” and “啊” when spoken.
5. Do not add timestamps, time ranges, numbering, bullets, Markdown headings, bold text, tables, code blocks, quotation wrappers, JSON, or quotation marks around the full transcription.
6. Do not add parenthetical, square-bracket, or angle-bracket annotations. Do not write “(pause)”, “[laughter]”, “(unclear)”, “(dialect)”, or similar sound events, actions, explanations, or guesses. Do not convert silent pauses or background noise into text labels.
7. Preserve repetitions, fillers, discourse habits, self-corrections, and unfinished words or sentences that occur in the audio. Do not delete, complete, or rewrite them for fluency, and do not correct slips based on common knowledge. Do not guess or fill in uncertain content.
8. Use only ordinary punctuation when needed to separate clauses. Do not use ellipses, em dashes, or special line breaks to mark silent duration, and do not output empty time spans.

These restrictions apply to content you add yourself. If a speaker actually says related words in the audio, transcribe them. Before submitting, internally remove any narration, labels, and formatting that you added, and output only the transcription text without the checking process.`;

const q2Zh = `【Q2 = 完整 Q1 提示词】

在上述 Q1 提示词之后追加：

任务上下文：
{task_context}

请继续只根据音频实际听到的内容进行逐字转写。任务上下文只用于说明话语任务类型，不是参考答案；不要根据图片、故事常识或上下文补写音频中没有说出的词语、人物、动作或情节。`;

const q2En = `[Q2 = the complete Q1 prompt]

Append the following after the Q1 prompt:

Task context:
{task_context}

Continue to transcribe only what is actually heard in the audio. The task context describes the discourse-task type; it is not a reference answer. Do not use the picture, common story knowledge, or the context to add words, people, actions, or events that are not spoken in the audio.`;

const contextsZh = `Greeting：这是一次临床语言评估中的问候和简短交谈。说话者可能进行问候、自我介绍或谈及近况；请仅转写实际听到的内容，不要补充未听到的个人信息。

Broken_Window：这是一个关于孩子踢球时意外打碎窗户的图片故事。故事可能涉及踢球、窗户玻璃破碎、屋内的人受到惊吓以及查看发生了什么；请以音频为准，不要补写未听到的情节。

Refused_Umbrella：这是一个关于下雨天拒绝带伞的图片故事。故事可能涉及家人提醒带伞、孩子拒绝、下雨后被淋湿以及家人的反应；请以音频为准，不要补写未听到的情节。

Cat_Rescue：这是一个关于营救被困小猫的图片故事。小猫爬到高树上无法下来，孩子和家人尝试帮助，消防员带着消防车和梯子前来救援；请以音频为准，不要补写未听到的情节。

Flood：这是一个关于洪水救援的图片故事。连续暴雨引发洪水，一名女子或女孩被水流困住并等待救援，救援人员赶来帮助她脱险；请以音频为准，不要补写未听到的情节。

Tortoise_Hare：这是龟兔赛跑的寓言故事。兔子起初领先并因骄傲停下休息，乌龟持续前进并最终获胜；请以音频为准，不要补写未听到的情节。

Cry_Wolf：这是狼来了的寓言故事。一个放羊的男孩多次谎称有狼，村民后来不再相信他，狼真的出现时无人前来帮助；请以音频为准，不要补写未听到的情节。

Egg_Ham_Fried_Rice：这是说明制作蛋、火腿和炒饭的程序性任务。说话者可能描述食材、准备步骤和烹饪顺序；请以音频为准，不要补写未听到的食材或步骤。

Important_Event：这是叙述个人重要事件或经历的开放式任务。具体人物、地点和事件内容因说话者而异；请仅转写实际听到的内容，不要假定或补写事件细节。

Stroke_Story：这是讲述脑卒中或脑损伤相关个人经历的任务。说话者可能谈及发病、就医或康复经历；请仅转写实际听到的内容，不要补写症状、地点或事件细节。

Stroke_Coping：这是谈论脑卒中或脑损伤后适应与应对的任务。说话者可能谈及康复、日常生活、支持或感受；请仅转写实际听到的内容，不要补写未听到的细节。`;

const contextsEn = `Greeting: A clinical language-assessment greeting and brief conversation. The speaker may greet someone, introduce themselves, or discuss recent events; transcribe only what is heard and do not add personal information.

Broken_Window: A picture story about a child accidentally breaking a window while playing football. It may involve kicking a ball, broken window glass, people inside being startled, and checking what happened; follow the audio and do not add unspoken events.

Refused_Umbrella: A picture story about refusing to take an umbrella on a rainy day. It may involve a family member reminding the child, the child refusing, getting wet, and the family's reaction; follow the audio and do not add unspoken events.

Cat_Rescue: A picture story about rescuing a trapped cat. The cat climbs into a tall tree and cannot get down; a child and family try to help, and firefighters arrive with a fire truck and ladder; follow the audio and do not add unspoken events.

Flood: A picture story about flood rescue. Continuous heavy rain causes flooding, a woman or girl is trapped by the water and waits for help, and rescuers arrive; follow the audio and do not add unspoken events.

Tortoise_Hare: The fable of the tortoise and the hare. The hare leads at first but stops to rest out of overconfidence, while the tortoise continues and eventually wins; follow the audio and do not add unspoken events.

Cry_Wolf: The fable of the boy who cried wolf. A shepherd boy repeatedly lies about a wolf, villagers stop believing him, and no one helps when the wolf actually appears; follow the audio and do not add unspoken events.

Egg_Ham_Fried_Rice: A procedural task about making eggs, ham, and fried rice. The speaker may describe ingredients, preparation steps, and cooking order; follow the audio and do not add unspoken ingredients or steps.

Important_Event: An open-ended task about an important personal event or experience. People, places, and events vary by speaker; transcribe only what is heard and do not assume or add details.

Stroke_Story: A task about a personal experience related to stroke or brain injury. The speaker may discuss onset, medical care, or rehabilitation; transcribe only what is heard and do not add symptoms, places, or event details.

Stroke_Coping: A task about adapting to and coping with stroke or brain injury. The speaker may discuss rehabilitation, daily life, support, or feelings; transcribe only what is heard and do not add details.`;

const languageData = {
  en: {
    skip: "Skip to model results", nav: ["Dataset", "Audio preparation", "Conditions & prompts", "Model results"], navLabel: "Page navigation", editLabel: "Page text editing", edit: "Edit text", done: "Finish editing", reset: "Restore defaults", editHint: "Click text with a dashed outline to edit; changes save automatically", saved: "Saved automatically", resetConfirm: "Clear saved text changes in this browser and restore the defaults?", heroTitle: "Speech transcription for aphasia,<br><span>compared on the same data and protocol.</span>", languageLabel: "Language", heroCopy: "A task-level ASR benchmark for Mandarin AphasiaBank. The page documents the raw-audio pipeline, the shared text-scoring protocol, and completed-model CER/WER results.", heroButtons: ["View model results", "See audio preparation"], datasetKicker: "01 · DATASET", datasetHeading: "Dataset and evaluation scope", datasetIntro: "The evaluation uses Mandarin discourse-task audio from AphasiaBank. Each unit is a complete task-level recording for one participant and one task; both Control and PWA groups are retained.", datasetSource: "<strong>Source:</strong> AphasiaBank is a multimedia discourse database for aphasia maintained by TalkBank. This benchmark follows the Mandarin AphasiaBank discourse-task protocol. The foundational methods paper is <a href=\"https://doi.org/10.1080/02687038.2011.589893\" target=\"_blank\" rel=\"noreferrer\">MacWhinney, Fromm, Forbes &amp; Holland (2011), <em>AphasiaBank: Methods for studying discourse</em></a>; related Mandarin-task research is <a href=\"https://talkbank.org/aphasia/access/Mandarin/0docs/deng2024.pdf\" target=\"_blank\" rel=\"noreferrer\">Deng et al. (2024), <em>Discourse task type–specific linguistic characteristics in Anomic Aphasia and Healthy Controls</em></a>.", datasetScope: "<strong>Frozen scope:</strong> 939 task-level audio units from 103 sessions (687 Control and 252 PWA), covering 11 discourse tasks. The task-level WAV files sum to approximately <strong>15.805 hours</strong>; this is the evaluation snapshot, not the duration of the entire AphasiaBank.", taskHeading: "11 discourse tasks", taskDescriptions: ["A picture story about a child accidentally breaking a window while playing football.", "A picture story about refusing an umbrella and returning for it after the rain starts.", "A picture story about a cat trapped in a tree and rescued by family members and firefighters.", "A picture story about waiting for rescue and escaping during a flood.", "A retelling of the fable in which the resting hare loses to the tortoise.", "A retelling of the fable about a shepherd boy who repeatedly lies about a wolf.", "Describing the ingredients and steps for making egg, ham, and fried rice.", "An open-ended account of an important personal event or experience.", "Brief conversation involving greetings, introductions, and recent events.", "Discussing rehabilitation, support, daily life, and coping after stroke.", "Describing a personal experience related to stroke or brain injury."], pipelineKicker: "02 · AUDIO PREPARATION", pipelineHeading: "From raw audio to task-level WAV", pipelineIntro: "The pipeline starts from CHAT transcripts and their associated media files. Raw transcripts, cleaned references, and model hypotheses are kept separate so scoring never overwrites source material.", pipelineLabel: "Audio preparation pipeline", pipelineTitles: ["Pair source files", "Locate task and speaker", "Export normalized segments", "Assemble task units"], pipelineDescriptions: ["Read each session's CHAT file and associated media while preserving session, group, and source-file traceability.", "Use @G or @Bg/@Eg task markers to identify discourse tasks; retain only timestamped participant/patient turns, usually PAR, and exclude evaluator turns.", "Cut mono 16 kHz PCM WAV segments from CHAT timestamps. Clean CHAT markers, annotations, and unintelligible placeholders in a separate reference copy while preserving the raw text.", "Concatenate available participant segments for each task_id in time order. No minimum-duration filter is applied, and inter-segment silence is excluded from the task-level WAV, yielding 939 evaluation units."], pipelineNote: "The processing goal is a fixed audio–reference pairing; model transcripts are not rewritten at the word level. When hypotheses contain narration, speaker labels, or analytical text, scoring uses a separate auditable cleanup copy.", resultsKicker: "03 · MODEL RESULTS", resultsHeading: "AphasiaBank model results", resultsIntro: "Values are overall micro-aggregate CER/WER; lower values indicate a smaller edit distance from the reference. Filter by condition or sort by CER/WER.", resultsBadge: "Same dataset · same task-level scope", conditionTitles: ["No-prompt baseline", "Generic verbatim transcription", "Task-context transcription"], conditionDescriptions: ["Submit audio only, without a text prompt. This measures the model's natural ASR output without task instructions or transcription rules.", "The model is told that the audio is natural speech from a Chinese clinical language assessment. It must transcribe verbatim, preserve repetitions and self-corrections, and avoid summaries, additions, speaker labels, and meta-narration.", "Append a task description selected from the CHAT task label after the full Q1 prompt. The context describes the task type but gives no reference answer; audio always takes priority."], q0Note: "Q0 has no experimental prompt.", q1Summary: "Show full Q1 prompt", q2Summary: "Show Q2 prompt structure", q2Footnote: "<code>{task_context}</code> is selected from the fixed CHAT <code>task_name</code>; see the 11 task descriptions above. It is never generated from the reference or model output.", q2NestedSummary: "View all 11 Q2 task contexts", q1Prompt: q1En, q2Prompt: q2En, contexts: contextsEn, controlsLabel: "Result filters and sorting", filterLabel: "Filter by condition", filters: ["All", "Q0", "Q1", "Q2"], sortLabel: "Sort", sortOptions: ["Model / condition", "CER: low to high", "WER: low to high"], tableHeaders: ["Model", "Condition", "CER", "WER", "Notes"], rankingEyebrow: "BEST OBSERVED CONDITION PER MODEL", rankingHeading: "Best completed condition by model", footer: "AphasiaBank ASR Benchmark"
  },
  zh: {
    skip: "跳到模型结果", nav: ["数据集", "语音处理", "条件与提示词", "模型指标"], navLabel: "页面导航", editLabel: "页面文字编辑", edit: "编辑文字", done: "完成编辑", reset: "恢复默认", editHint: "点击虚线框内文字即可修改，自动保存", saved: "已自动保存", resetConfirm: "清除当前浏览器保存的文字修改并恢复默认内容？", heroTitle: "失语症话语转写，<br><span>在同一数据与口径下比较。</span>", languageLabel: "语言", heroCopy: "面向 Mandarin AphasiaBank 的任务级语音识别基准。页面汇总原始语音处理路径、统一的文本评分口径，以及已完成模型的 CER/WER。", heroButtons: ["查看模型指标", "了解语音处理"], datasetKicker: "01 · DATASET", datasetHeading: "数据集与评测范围", datasetIntro: "评测对象为 AphasiaBank 中的普通话话语任务音频。每个单元对应同一被试、同一任务的一段完整任务级音频；Control 与 PWA 均保留在同一基准中。", datasetSource: "<strong>数据来源：</strong>AphasiaBank 是 TalkBank 维护的失语症多媒体话语数据库。本项目采用 Mandarin AphasiaBank 的标准话语任务协议。基础方法论文为 <a href=\"https://doi.org/10.1080/02687038.2011.589893\" target=\"_blank\" rel=\"noreferrer\">MacWhinney, Fromm, Forbes &amp; Holland (2011), <em>AphasiaBank: Methods for studying discourse</em></a>；普通话任务的相关研究见 <a href=\"https://talkbank.org/aphasia/access/Mandarin/0docs/deng2024.pdf\" target=\"_blank\" rel=\"noreferrer\">Deng et al. (2024), <em>Discourse task type–specific linguistic characteristics in Anomic Aphasia and Healthy Controls</em></a>。", datasetScope: "<strong>本次冻结范围：</strong>939 个任务级音频单元，来自 103 个 session（687 个 Control、252 个 PWA），覆盖 11 类话语任务。按任务级 WAV 的实际时长求和约 <strong>15.805 小时</strong>；这是本项目评测快照的总时长，不代表 AphasiaBank 全部语料的总时长。", taskHeading: "11 类话语任务", taskDescriptions: ["孩子踢球意外打碎窗户的图片故事。", "孩子拒绝带伞、下雨后返回取伞的图片故事。", "小猫被困树上，家人和消防员进行营救的图片故事。", "暴雨洪水中等待救援并脱险的图片故事。", "兔子因休息落败、乌龟最终获胜的寓言复述。", "牧羊男孩多次谎称狼来，最终失去村民信任的寓言复述。", "描述制作蛋、火腿炒饭的食材与步骤。", "开放式讲述个人重要事件或经历。", "问候、自我介绍和近况等简短交谈。", "谈论脑卒中后的康复、支持、日常生活与应对。", "讲述脑卒中或脑损伤相关的个人经历。"], pipelineKicker: "02 · AUDIO PREPARATION", pipelineHeading: "从原始语音到任务级 WAV", pipelineIntro: "处理过程从 CHAT 转录与对应媒体文件出发。原始转录、清洗参考文本和模型假设分开保存，避免用评分处理覆盖源材料。", pipelineLabel: "音频处理流程", pipelineTitles: ["配对源文件", "定位任务与说话人", "导出标准化片段", "汇聚为任务单元"], pipelineDescriptions: ["读取每个 session 的 CHAT 文件与对应媒体文件，保留 session、组别与源文件追溯信息。", "通过 @G 或 @Bg/@Eg 任务标记识别话语任务；仅保留 participant/patient（通常为 PAR）带时间戳的发话，排除评估者轮次。", "按 CHAT 时间戳切出单声道 16 kHz PCM WAV。参考文本另行清理 CHAT 标记、注释和不可懂占位符，同时保留原始文本。", "同一 task_id 的可用受试者片段按时间顺序拼接；不施加最短时长过滤，片段间静音不进入任务级 WAV，得到 939 个评测单元。"], pipelineNote: "处理目标是固定音频与参考文本的配对，不对模型转写作词语改写。涉及模型旁白、说话人标签或分析性文本时，使用独立的、可审计的清理副本进行评分。", resultsKicker: "03 · MODEL RESULTS", resultsHeading: "AphasiaBank 模型指标", resultsIntro: "数值均为整体 micro-aggregate CER/WER；较低表示与参考文本的编辑距离更小。点击条件筛选，或按 CER / WER 排序。", resultsBadge: "同一数据集 · 同一任务级范围", conditionTitles: ["无提示词基线", "通用逐字转写", "任务上下文转写"], conditionDescriptions: ["只提交音频，不提供文字提示。用于观察模型在没有任务说明和转写规则时的自然 ASR 输出。", "向模型说明这是中文临床语言评估中的自然口语，要求逐字转写、保留重复和自我修正，并禁止总结、补写、说话人标签和元叙述。", "在 Q1 完整提示词后追加一个由 CHAT 任务标签预先选择的任务简介。上下文只提供任务类型，不提供参考答案；音频始终优先。"], q0Note: "Q0 没有实验提示词。", q1Summary: "公开 Q1 完整提示词", q2Summary: "公开 Q2 提示词结构", q2Footnote: "<code>{task_context}</code> 按固定的 CHAT <code>task_name</code> 选择，具体 11 条任务简介见上方列表；不会从参考文本或模型输出反向生成。", q2NestedSummary: "查看 11 条 Q2 任务上下文原文", q1Prompt: q1Zh, q2Prompt: q2Zh, contexts: contextsZh, controlsLabel: "结果筛选与排序", filterLabel: "按条件筛选", filters: ["全部", "Q0", "Q1", "Q2"], sortLabel: "排序", sortOptions: ["模型 / 条件", "CER：低到高", "WER：低到高"], tableHeaders: ["模型", "条件", "CER", "WER", "备注"], rankingEyebrow: "BEST OBSERVED CONDITION PER MODEL", rankingHeading: "按模型查看最佳已完成条件", footer: "AphasiaBank ASR Benchmark"
  }
};

let currentLanguage = localStorage.getItem("aphasiabank-asr-language") || "en";
let activeCondition = "all";
let sortBy = "model";
const languageSelect = document.querySelector("#language-select");

function setHTML(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.innerHTML = value;
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function setTexts(selector, values) {
  document.querySelectorAll(selector).forEach((element, index) => {
    if (values[index] !== undefined) element.textContent = values[index];
  });
}

function translatePage(language) {
  const t = languageData[language];
  document.documentElement.lang = language === "en" ? "en" : "zh-CN";
  document.title = language === "en" ? "AphasiaBank ASR Benchmark" : "AphasiaBank ASR 基准";
  document.querySelector('meta[name="description"]').content = language === "en" ? "AphasiaBank Mandarin task-level ASR model comparison." : "AphasiaBank 普通话任务级语音识别模型比较。";
  setText(".skip-link", t.skip);
  document.querySelector(".brand").setAttribute("aria-label", language === "en" ? "Back to top" : "返回顶部");
  document.querySelector("nav").setAttribute("aria-label", t.navLabel);
  setTexts("nav a", t.nav);
  setText(".language-switcher label", t.languageLabel);
  setHTML(".hero h1", language === "en" ? "ASR for AphasiaBank Mandarin on different audio models" : t.heroTitle);
  setText(".hero-copy", t.heroCopy);
  setTexts(".hero-actions a", t.heroButtons);
  setText("#dataset .section-kicker", t.datasetKicker);
  setText("#dataset .section-heading h2", t.datasetHeading);
  setText("#dataset .section-heading p", t.datasetIntro);
  setHTML("#dataset .dataset-overview p:nth-child(1)", t.datasetSource);
  setHTML("#dataset .dataset-overview p:nth-child(2)", t.datasetScope);
  setText("#dataset .task-card h3", t.taskHeading);
  setTexts("#dataset .task-list li span", t.taskDescriptions);
  setText("#pipeline .section-kicker", t.pipelineKicker);
  setText("#pipeline .section-heading h2", t.pipelineHeading);
  setText("#pipeline .section-heading p", t.pipelineIntro);
  document.querySelector("#pipeline .pipeline").setAttribute("aria-label", t.pipelineLabel);
  setTexts("#pipeline .pipeline > li h3", t.pipelineTitles);
  setTexts("#pipeline .pipeline > li p", t.pipelineDescriptions);
  setText("#pipeline .pipeline-note", t.pipelineNote);
  setText("#results .section-kicker", t.resultsKicker);
  setText("#results .results-heading h2", t.resultsHeading);
  setText("#results .results-heading p", t.resultsIntro);
  setText("#results .result-badge", t.resultsBadge);
  setTexts("#conditions .condition-card h3", t.conditionTitles);
  setTexts("#conditions .condition-card > p:first-of-type", t.conditionDescriptions);
  setText("#conditions .condition-card:nth-child(1) .condition-note", t.q0Note);
  setTexts("#conditions .condition-card summary", [t.q1Summary, t.q2Summary, t.q2NestedSummary]);
  setTexts("#conditions .condition-card pre", [t.q1Prompt, t.q2Prompt, t.contexts]);
  setHTML("#conditions .condition-card:nth-child(3) .prompt-footnote", t.q2Footnote);
  document.querySelector("#results .controls").setAttribute("aria-label", t.controlsLabel);
  document.querySelector("#results .filter-group").setAttribute("aria-label", t.filterLabel);
  setTexts("#results .filter", t.filters);
  setText(".sort-label", t.sortLabel);
  setTexts("#sort-select option", t.sortOptions);
  setTexts("#results thead th", t.tableHeaders);
  setText(".ranking-panel .eyebrow", t.rankingEyebrow);
  setText(".ranking-panel h3", t.rankingHeading);
  setText("footer span", t.footer);
  languageSelect.value = language;
  renderTable();
  renderRanking();
}

function orderedRows() {
  const filtered = results.filter(row => activeCondition === "all" || row.condition === activeCondition);
  return [...filtered].sort((a, b) => {
    if (sortBy === "cer") return a.cer - b.cer;
    if (sortBy === "wer") return a.wer - b.wer;
    return a.model.localeCompare(b.model, "en") || a.condition.localeCompare(b.condition, "en");
  });
}

const format = value => `${value.toFixed(4)}%`;

function renderTable() {
  const body = document.querySelector("#results-body");
  body.innerHTML = orderedRows().map(row => `
    <tr>
      <td class="model">${row.model}</td>
      <td><span class="condition">${row.condition}</span></td>
      <td class="metric">${format(row.cer)}</td>
      <td class="metric">${format(row.wer)}</td>
      <td class="note">${currentLanguage === "en" ? row.noteEn : row.noteZh}</td>
    </tr>`).join("");
}

function renderRanking() {
  const modelNames = [...new Set(results.map(row => row.model))];
  const best = modelNames.map(model => {
    const candidates = results.filter(row => row.model === model);
    return candidates.reduce((winner, row) => row.wer < winner.wer ? row : winner);
  }).sort((a, b) => a.wer - b.wer);
  const maxWer = Math.max(...best.map(row => row.wer));
  document.querySelector("#ranking-list").innerHTML = best.map(row => `
    <div class="rank-row">
      <span class="rank-label">${row.model} · ${row.condition}</span>
      <span class="rank-track"><span class="rank-fill" style="width:${Math.max(4, 100 - (row.wer / maxWer) * 86)}%"></span></span>
      <span class="rank-score">WER ${format(row.wer)}</span>
    </div>`).join("");
}

translatePage(currentLanguage);

languageSelect.addEventListener("change", event => {
  currentLanguage = event.target.value;
  localStorage.setItem("aphasiabank-asr-language", currentLanguage);
  translatePage(currentLanguage);
});

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    activeCondition = button.dataset.condition;
    document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
    renderTable();
  });
});

document.querySelector("#sort-select").addEventListener("change", event => {
  sortBy = event.target.value;
  renderTable();
});
