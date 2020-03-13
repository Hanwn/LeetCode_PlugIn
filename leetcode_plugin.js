var arr_textarea_len = 0;
var mark = true;
var but = document.getElementsByClassName('custom-testcase__2YgB');
but[0].onclick = runCode;

function runCode(){
	setTimeout(fill_test_cases, 500);
}

function check(st) {
	for (let i = 0; i < st.length; i++) {
		if (st[i] === '=') {
			return 1;
		}
	}
	return 0;
}
function oneLine(demo){
	var input = demo.innerText.split('\n');
	var flag = false;
	if (input[0].length == 2) {
		flag = check(input[1]);
		if (flag) {
			return input[1].split('=').slice(-1);
		}
		return input[1].substring(3);
	}else{
		flag = check(input[0]);
		if (flag) {
			return input[0].split('=').slice(-1);
		}
		return input[0].split(':').slice(-1);
	}
}
function manyLines(demo) {
	var input = demo.innerText.split('\n');
	var flag = false;
	var retStr = "";
	if (input[0].length == 2) {
		flag = check(input[1]);
		// 存在等号，且输入换行
		if (flag) {
			for (let j = 1; j < input.length; j++) {
				if (input[j].slice(0) === "输出") {
					break;
				}
				retStr += input[j].split('=').slice(-1) + '\n';
			}
			return retStr;
		}else{
			for (let j = 1; j < input.length; j++) {
				if (input[j].slice(0) === "输出") {
					break;
				}
				retStr += input[j] + '\n';
			}
			return retStr;
		}
	}else{
		flag = check(input[0]);
		//存在等号，且输入不换行
		if (flag) {
			let test = input[0].substring(3).split('=');
			for (let j = 1; j < test.length - 1; j++) {
				var k = test[j].length - 1;
				for (; k >= 0; k--) {
					if (test[j][k] == ',') {
						break;
					}
				}
				retStr += test[j].substring(0,k) + '\n';
			}
			retStr += test[test.length - 1];
			return retStr;
		}
	}
}

function fill_test_cases(){
	var textarea = document.getElementsByClassName('testcase-editor__lA_R')[0];
	if (mark) {
		mark = false;
		arr_textarea_len = textarea.value.split('\n').length;
	}
	var demo = document.getElementsByClassName('notranslate')[1].getElementsByTagName('pre');
	var test_cases = "";
	for (let i = 0; i < demo.length; i++) {
		if (arr_textarea_len == 1) {
			test_cases += oneLine(demo[i]) + '\n';
		}
		else{
			test_cases += manyLines(demo[i]) + '\n';
		}
	}
	textarea.innerHTML = new String(test_cases);
	textarea.value = new String(test_cases);
	console.log(test_cases);
}