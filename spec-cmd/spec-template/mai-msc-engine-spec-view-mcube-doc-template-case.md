Mortise.AI 视图组件规则

# 1. 基础信息

````
视图组件类：SalesTrainingEvaluationBrick
发送事件类：SalesTrainingEvaluationBrickActionKeys
接收事件类：SalesTrainingEvaluationBrickStateKeys
代码名称：sales-training-evaluation-brick
代码语言：React
````

# 2. 依赖与环境(NPM)

````
无
````

# 3. 功能与需求

## 3.1 功能需求说明
**组件名称**
````
SalesTrainingEvaluationComponent
````
**组件描述**
````
销售培训评估界面
````

---

## 3.2 界面与视图说明
**1. 销售培训评估界面**

````
@视图 - 销售培训评估界面

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App: React.FC = () => {
	const [standardContent, setStandardContent] = useState('');
	const [audioUrl, setAudioUrl] = useState('');
	const [result, setResult] = useState('-');
	const [uploadLoading, setUploadLoading] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false);
	
	const handleUploadWord = () => {
		alert('上传 Word 文档功能');
	};
	
	const handleConfirmAudioUrl = () => {
		alert('确认音频 URL');
	};
	
	const handleStartEvaluation = () => {
		alert('提交考核分析');
	};
	
	// 全局 Loading 遮罩（使用 Portal）
	const renderLoadingOverlay = () => {
		if (!uploadLoading && !submitLoading) return null;
		return ReactDOM.createPortal(
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 99999 }}>
				<div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4 shadow-2xl">
					<svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
					<p className="text-lg font-medium text-gray-700">
						{uploadLoading ? '上传中，请稍候...' : '提交中，请稍候...'}
					</p>
				</div>
			</div>,
			document.body
		);
	};
	
	return (
		<>
		{renderLoadingOverlay()}
		<div className="w-full h-full overflow-y-auto">
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center px-4 py-12">
		{/* Header Section */}
		<div className="text-center mb-16 mt-8">
			<h1 className="text-4xl font-bold text-gray-800 mb-4">智能考核助手</h1>
			<p className="text-lg text-gray-600">让每一次人力评估都更加高效</p>
		</div>
		{/* Hero Image Section */}
		<div className="w-full max-w-4xl mb-16">
			<img
				src="https://ai-public.mastergo.com/ai/img_res/a627b3b538fa0df5ec2d5b0e4e1a7b83.jpg"
				alt="考核助手界面示意图"
				className="w-full h-auto rounded-xl shadow-lg object-cover"
			/>
		</div>
		{/* Content Sections */}
		<div className="w-full max-w-4xl space-y-12">
			{/* Upload Word Document */}
			<div className="flex items-center justify-between p-6 bg-white rounded-xl shadow-sm">
				<div className="text-lg font-medium text-gray-700 w-1/4">上传考核标准内容</div>
				<div className="w-3/4 flex justify-end">
					<button
						type="button"
						onClick={handleUploadWord}
						disabled={uploadLoading || submitLoading}
						className="!rounded-button whitespace-nowrap flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<i className="fas fa-upload"></i>
						<span>上传</span>
					</button>
				</div>
			</div>
			{/* Standard Content Display */}
			<div className="flex items-start p-6 bg-white rounded-xl shadow-sm">
				<div className="text-lg font-medium text-gray-700 w-1/4 pt-3">考核标准</div>
				<div className="w-3/4">
					<textarea
						value={standardContent}
						readOnly
						placeholder="上传考核内容后将生成考核标准..."
						className="w-full h-40 p-4 border border-gray-300 rounded-lg bg-gray-50 resize-none"
					/>
				</div>
			</div>
			{/* Audio URL Input */}
			<div className="flex items-center p-6 bg-white rounded-xl shadow-sm">
				<div className="text-lg font-medium text-gray-700 w-1/4">考核录音</div>
				<div className="w-3/4 flex gap-4">
					<input
						type="url"
						value={audioUrl}
						onChange={(e) => setAudioUrl(e.target.value)}
						placeholder="请输入音频文件URL..."
						disabled={uploadLoading || submitLoading}
						className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
					/>
					<button
						type="button"
						onClick={handleConfirmAudioUrl}
						disabled={uploadLoading || submitLoading}
						className="!rounded-button whitespace-nowrap px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						确认
					</button>
				</div>
			</div>
		</div>
		{/* Submit Button */}
		<div className="mt-16">
			<button
				type="button"
				onClick={handleStartEvaluation}
				disabled={uploadLoading || submitLoading}
				className="!rounded-button whitespace-nowrap px-10 py-4 bg-green-500 hover:bg-green-600 text-white text-lg font-medium transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
			>
				<span>提交考核</span>
			</button>
		</div>
		{/* Result Display */}
		<div className="w-full max-w-4xl mt-16">
			<div className="bg-white rounded-xl shadow-sm p-6">
				<div className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">考核结果</div>
				<div className="p-6 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 min-h-[120px] flex items-center justify-center">
					{result}
				</div>
			</div>
		</div>
		</div>
		</div>
		</>
	);
};
export default App

````

---

## 3.3 接收事件说明

**[ 1 ] 接收事件 evaluation_result_state_event**

|事件名|外部监听|外部发送|事件描述|
|:---|:---|:---|:---|
|evaluation_result_state_event|false|false|接收考核分析结果并进行展示|

事件参数模型 : SalesTrainingEvaluationBrickStateModel

|名称|类型|是否可空|默认值|描述|
|:---|:---|:---|:---|:---|
|score|number|false|0|考核评分|
|strengths|string|false|-|考核优点列表|
|weaknesses|string|false|-|考核不足列表|

**[ 2 ] 接收事件 standard_result_state_event**

|事件名|外部监听|外部发送|事件描述|
|:---|:---|:---|:---|
|standard_result_state_event|false|false|接收生成的考核标准|

事件参数模型 : standardContent

|名称|类型|是否可空|默认值|描述|
|:---|:---|:---|:---|:---|
|standardContent|string|false|-|考核标准|

---

## 3.4 发送事件说明

**[ 1 ] 发送事件 create_standard_action_event**

|事件名|外部监听|事件描述|
|:---|:---|:---|
|create_standard_action_event|false|读取 Word 内容，并发送给AI生成考核标准|

事件参数模型 : SalesTrainingEvaluationBrickActionModel

|名称|类型|是否可空|默认值|描述|
|:---|:---|:---|:---|:---|
|wordContent|string|false|-|读取的本地 Word 内容|

事件参数关联知识点 @wordContent
1. @自定义 - 读取 Word 内容逻辑
````
- 使用 mammoth.js 库解析 Word 文档（.docx 格式）
- 读取 word 内容，需要对内容进行校验，如果为空，需要提示 Word 为空
- 文件读取过程中显示全局 Loading 遮罩，阻止其他操作
- 文件读取失败时关闭 Loading 并提示错误信息
````

**[ 2 ] 发送事件 start_evaluation_action_event**

|事件名|外部监听|事件描述|
|:---|:---|:---|
|start_evaluation_action_event|false| 提交考核分析请求，包含考核标准和音频链接|

事件关联知识点
1. @自定义 - 提交考核分析前需要校验
````
- 考核标准内容不能为空（需先上传 Word 生成）
- 音频链接不能为空
- 校验通过后显示全局 Loading，发送事件
- 接收到结果后关闭 Loading
````

事件参数模型 : SalesTrainingEvaluationBrickActionModel

|名称|类型|是否可空|默认值|描述|
|:---|:---|:---|:---|:---|
|standardContent|string|false|-|考核标准|
|audioUrl|string|false|-|音频连接地址|


