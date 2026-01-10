Mortise.AI 逻辑组件规则

# 1. 基础信息

````
逻辑组件类:SalesTrainingEvaluationLogic
发送事件类:SalesTrainingEvaluationLogicActionKeys
接收事件类:SalesTrainingEvaluationLogicStateKeys
代码名称:sales-training-evaluation-logic
代码语言:React
````

# 2. 依赖与环境(NPM)

````
无
````

# 3. 功能与需求

## 3.1 功能需求说明
**组件名称**
````
SalesTrainingEvaluationLogic
````
**组件描述**
````
销售培训评估逻辑组件用于处理销售培训过程中的评估数据，包括培训成绩计算、效果分析等功能
````

---

## 3.2 接收事件说明

**[ 1 ] 接收事件 create_standard_state_event**

|事件名|外部监听|外部发送|事件描述|
|:---|:---|:---|:---|
|create_standard_state_event|false|false|生成考核标准|

事件关联知识点
1. @自定义 - 请求阿里云大模型生成考核标准
````
API_KEY = sk-1133e1f7e58a4104a4ebf1bdff32ef97

1.请求体
curl -X POST https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions \
-H "Authorization: Bearer $API_KEY" \
-H "Content-Type: application/json" \
-d '{
    // 模型名称：Qwen 大语言模型（商业版、开源版）、Qwen-VL、Qwen-Coder、Qwen-Omni、Qwen-Math。
    "model": "qwen-plus",
    "messages": [
        // 可选，System Message 系统消息，用于设定大模型的角色、语气、任务目标或约束条件等。一般放在 messages 数组的第一位。
        {
            // 系统消息的角色，固定为system。
            "role": "system",
            // 系统指令，用于明确模型的角色、行为规范、回答风格和任务约束等。
            "content": "You are a helpful assistant."
        },
        // 必选，用户消息，用于向模型传递问题、指令或上下文等。
        {
            // 用户消息的角色，固定为user。
            "role": "user",
            // 消息内容。
            "content": "你是谁？"
        }
    ]
}'
返回体
{
    // 模型生成内容的数组。
    "choices": [
        {
            // 模型输出的消息。 
            "message": {
                // 消息的角色，固定为assistant。
                "role": "assistant",
                // 模型的回复内容。
                "content": "我是阿里云开发的一款超大规模语言模型，我叫通义千问。"
                // 模型的思维链内容。
                "reasoning_content": "..."
            },
            // 模型停止生成的原因。触发输入参数中的stop参数，或自然停止输出时为stop；生成长度过长而结束为length；需要调用工具而结束为tool_calls。
            "finish_reason": "stop",
            // 当前对象在choices数组中的索引。
            "index": 0,
            // 模型输出的 Token 概率信息。
            "logprobs": null
        }
    ],
    // 始终为chat.completion。
    "object": "chat.completion",
    // 本次请求的 Token 消耗信息。
    "usage": {
        // 输入的 Token 数。
        "prompt_tokens": 3019,
        // 模型输出的 Token 数。
        "completion_tokens": 104,
        // 消耗的总 Token 数，为prompt_tokens与completion_tokens的总和。
        "total_tokens": 3123,
        // 输入 Token 的细粒度分类。
        "prompt_tokens_details": {
          .... 
        }
    },
    // 请求创建时的 Unix 时间戳（秒）。
    "created": 1735120033,
    // 该参数当前固定为null
    "system_fingerprint": null,
    // 本次请求使用的模型。
    "model": "qwen-plus",
    // 本次调用的唯一标识符。
    "id": "chatcmpl-6ada9ed2-7f33-9de2-8bb0-78bd4035025a"
}

````

事件参数模型 : SalesTrainingEvaluationLogicStateModel

|名称|类型|是否可空|默认值|描述|
|:---|:---|:---|:---|:---|
|wordContent|string|false|-|读取的本地 Word 内容|

**[ 2 ] 接收事件 start_evaluation_state_event**

|事件名|外部监听|外部发送|事件描述|
|:---|:---|:---|:---|
|start_evaluation_state_event|false|false|通过考核标准和音频链接进行评分|

事件关联知识点
1. @自定义 - 请求阿里云大模型 [通义千问3-ASR-Flash]，进行语音识别
````
API_KEY = sk-1133e1f7e58a4104a4ebf1bdff32ef97

**请求体**
curl --location --request POST 'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation' \
--header 'Authorization: Bearer $API_KEY' \
--header 'Content-Type: application/json' \
--data '{
    // 模型名称：通义千问3-ASR-Flash 模型（qwen3-asr-flash）
    "model": "qwen3-asr-flash",
    "input": {
        // 通过HTTP调用时，请将 messages 放入 input 对象中。定义模型的目标或角色。
        "messages": [ 
            {
                // 系统消息，请放在 messages 列表的第一位。系统消息指定上下文（Context）。通义千问3-ASR-Flash支持用户在语音识别的同时，提供背景文本、实体词表等参考信息（Context），从而获得定制化的识别结果。长度限制：不超过10000 Token
                "content": [ 。
                    {
                        "text": "" 
                    }
                ],
                "role": "system" // 固定为 system。
            },
            {
                 // 用户消息的内容。
                "content": [
                    {
                        // 待识别音频。通义千问3-ASR-Flash模型支持三种输入形式：Base64编码的文件、本地文件绝对路径、公网可访问的待识别文件URL。
                        "audio": "https://dashscope.oss-cn-beijing.aliyuncs.com/audios/welcome.mp3"
                    }
                ],
                // 用户消息的角色，固定为user。
                "role": "user" 
            }
        ]
    },
    "parameters": {
        // asr_options，可选，用来指定某些功能是否启用。仅通义千问3-ASR-Flash支持该参数，通义千问Audio ASR不支持。
        "asr_options": {
            // language 可选，language，若已知音频的语种，可通过该参数指定待识别语种，以提升识别准确率。只能指定一个语种。若音频语种不确定，或包含多种语种（例如中英日韩混合），请勿指定该参数。
            // 参数值：zh：中文（普通话、四川话、闽南语、吴语、ue：粤语、en：英文、ja：日语、de：德语、ko：韩语、ru：俄语、fr：法语、pt：葡萄牙语、ar：阿拉伯语、it：意大利语、es：西班牙语、hi：印地语、id：印尼语、th：泰语、tr：土耳其语、uk：乌克兰语、vi：越南语
            "language": "zh",
            // 是否启用ITN（Inverse Text Normalization，逆文本标准化）。该功能仅适用于中文和英文音频。
            // 参数值：true：开启；false：关闭。
            "enable_itn": false
        }
    }
}'
**返回体**
{
    // 调用结果信息。
    "output": {
        // 模型的输出信息。当result_format为message时返回choices参数。
        "choices": [
            {
                // 有三种情况：1.正在生成时为 null；2.因模型输出自然结束，或触发输入参数中的stop条件而结束时为stop；3.因生成长度过长而结束为length。
                "finish_reason": "stop",
                // 模型输出的消息对象。
                "message": {
                    // 输出标注信息（如语种）
                    "annotations": [
                        {
                            // 被识别音频的语种。当请求参数language已指定语种时，该值与所指定的参数一致。
                            "language": "zh",
                            // 固定为audio_info，表示音频信息。
                            "type": "audio_info",
                            // 被识别音频的情感。支持的情感如下：
                            "emotion": "neutral"
                        }
                    ],
                    // 输出消息的内容。语音识别结果。
                    "content": [
                        {
                            // surprised：惊讶、neutral：平静、happy：愉快、sad：悲伤、disgusted：厌恶、angry：愤怒、fearful：恐惧
                            "text": "欢迎使用阿里云。"
                        }
                    ],
                    // 输出消息的角色，固定为assistant。
                    "role": "assistant"
                }
            }
        ]
    },
    // 本次请求使用的Token信息。
    "usage": {
        // 通义千问3-ASR-Flash输入内容长度（Token）。
        "input_tokens_details": {
            // 通义千问3-ASR-Flash使用上下文增强功能时输入的文本长度（Token），上限为10000 Token。
            "text_tokens": 0
        },
        // 通义千问3-ASR-Flash输出内容长度（Token）。
        "output_tokens_details": {
            // 通义千问3-ASR-Flash输出的识别结果文本长度（Token）。
            "text_tokens": 6
        },
        // 通义千问3-ASR-Flash音频时长（秒）。
        "seconds": 1,
        // 通义千问Audio ASR输入音频长度（Token）。音频转换Token规则：每秒音频转换为25个Token，不足1秒按1秒计算。
        "input_tokens": 0,
        // 通义千问Audio ASR输出的识别结果文本长度（Token）。
        "output_tokens": 0,
        // 通义千问Audio ASR输出的音频长度（Token）。音频转换Token规则：每秒音频转换为25个Token，不足1秒按1秒计算。
        "audio_tokens": 0
    },
    // 本次调用的唯一标识符。
    "request_id": "568e2bf0-d6f2-97f8-9f15-a57b11dc6977"
}
````
2. @自定义 - 请求阿里云大模型 [qwen-plus]，进行评分
````
API_KEY = sk-1133e1f7e58a4104a4ebf1bdff32ef97

**请求体**
curl -X POST https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions \
-H "Authorization: Bearer $API_KEY" \
-H "Content-Type: application/json" \
-d '{
    // 模型名称：Qwen 大语言模型（商业版、开源版）、Qwen-VL、Qwen-Coder、Qwen-Omni、Qwen-Math。
    "model": "qwen-plus",
    "messages": [
        // 可选，System Message 系统消息，用于设定大模型的角色、语气、任务目标或约束条件等。一般放在 messages 数组的第一位。
        {
            // 系统消息的角色，固定为system。
            "role": "system",
            // 系统指令，用于明确模型的角色、行为规范、回答风格和任务约束等。
            "content": "You are a helpful assistant."
        },
        // 必选，用户消息，用于向模型传递问题、指令或上下文等。
        {
            // 用户消息的角色，固定为user。
            "role": "user",
            // 消息内容。
            "content": "你是谁？"
        }
    ]
}'
**返回体**
{
    // 模型生成内容的数组。
    "choices": [
        {
            // 模型输出的消息。 
            "message": {
                // 消息的角色，固定为assistant。
                "role": "assistant",
                // 模型的回复内容。
                "content": "我是阿里云开发的一款超大规模语言模型，我叫通义千问。"
                // 模型的思维链内容。
                "reasoning_content": "..."
            },
            // 模型停止生成的原因。触发输入参数中的stop参数，或自然停止输出时为stop；生成长度过长而结束为length；需要调用工具而结束为tool_calls。
            "finish_reason": "stop",
            // 当前对象在choices数组中的索引。
            "index": 0,
            // 模型输出的 Token 概率信息。
            "logprobs": null
        }
    ],
    // 始终为chat.completion。
    "object": "chat.completion",
    // 本次请求的 Token 消耗信息。
    "usage": {
        // 输入的 Token 数。
        "prompt_tokens": 3019,
        // 模型输出的 Token 数。
        "completion_tokens": 104,
        // 消耗的总 Token 数，为prompt_tokens与completion_tokens的总和。
        "total_tokens": 3123,
        // 输入 Token 的细粒度分类。
        "prompt_tokens_details": {
          .... 
        }
    },
    // 请求创建时的 Unix 时间戳（秒）。
    "created": 1735120033,
    // 该参数当前固定为null
    "system_fingerprint": null,
    // 本次请求使用的模型。
    "model": "qwen-plus",
    // 本次调用的唯一标识符。
    "id": "chatcmpl-6ada9ed2-7f33-9de2-8bb0-78bd4035025a"
}

````

事件参数模型 : SalesTrainingEvaluationLogicStateModel

|名称|类型|是否可空|默认值|描述|
|:---|:---|:---|:---|:---|
|standardContent|string|false|-|考核标准|
|audioUrl|string|false|-|音频连接地址|

---

## 3.3 发送事件说明

**[ 1 ] 发送事件 standard_result_action_event**

|事件名|外部监听|事件描述|
|:---|:---|:---|
|standard_result_action_event|false|发送评估数据进行培训效果分析|

事件参数模型 : SalesTrainingEvaluationLogicActionModel

|名称|类型|是否可空|默认值|描述|
|:---|:---|:---|:---|:---|
|evaluationData|object|false|-|培训效果评估数据|

**[ 2 ] 发送事件 evaluation_result_action_event**

|事件名|外部监听|事件描述|
|:---|:---|:---|
|evaluation_result_action_event|false|发送考核标准和音频链接进行评分|

事件参数模型 : SalesTrainingEvaluationLogicActionModel

|名称|类型|是否可空|默认值|描述|
|:---|:---|:---|:---|:---|
|score|number|false|-|考核评分|
|strengths|string|false|-|考核优点评价|
|weaknesses|string|false|-|考核缺点评价|


