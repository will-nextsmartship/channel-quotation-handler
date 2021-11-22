import xlsx from 'xlsx';
import { channelTemplateList, COST_MODE_LABELS } from './config/const';
import { checkCneTemplateIsValid, handleCneExcelJson } from './script/cne';
import { checkDhlLaxEcomIsValid, handleDhlLaxEcomJson } from './script/dhlLAXEcom';
import { check4PXTemplateIsValid, handle4pxExcelJson } from './script/fourpx';
import { checkHsdCsPostTemplateIsValid, handleHsdCsPostExcelJson } from './script/hsdCsPost';
import { checkHsdEPostTemplateIsValid, handleHsdEPostExcelJson } from './script/hsdEPost';
import { checkHsdNLPostTemplateIsValid, handleHsdNLPostExcelJson } from './script/hsdNLPost';
import { checkHsdZHEPostTemplateIsValid, handleHsdZHEPostExcelJson } from './script/hsdZHEPost';
import { checkLtianCAExpressTemplateIsValid, handleLtianCAExpressExcelJson } from './script/ltianCAExpress';
import { checkLtianCASensitiveTemplateIsValid, handleLtianCASensitiveExcelJson } from './script/ltianCASensitive';
import { checkUBITemplateIsValid, handleUBIExcelJson } from './script/UBI';
import { checkUflTemplateIsValid, handleUflExcelJson } from './script/ufl';
import { dateFormat, downloadString, preprocessExcelJson } from './script/utils';
import { checkWanbTemplateIsValid, handleWanbExcelJson } from './script/wanb';
import { checkYuntuTemplateIsValid, handleYuntuExcelJson } from './script/yuntu';
import { checkZtoAUDirectLineTemplateIsValid, handleZtoAUDirectLineExcelJson } from './script/ztoAUDirectLine';
import { checkZtoAuPostZxTemplateIsValid, handleZtoAuPostZxExcelJson } from './script/ztoAuPostZx';
import { checkZtoCtwcTemplateIsValid, handleZtoCtwcExcelJson } from './script/ztoCtwc';
import { checkZtoHkDhlTemplateIsValid, handleZtoHkDhlExcelJson } from './script/ztoHkDhl';
import { checkZtoHKHTemplateIsValid, handleZtoHKHExcelJson } from './script/ztoHKH';
import { checkZtoSGMYDirectLineTemplateIsValid, handleZtoSGMYDirectLineExcelJson } from './script/ztoSGMYDirectLine';
import { checkZtoSZFedexTemplateIsValid, handleZtoSZFedexExcelJson } from './script/ztoSZFedex';

export function resolveExcelToJson(fileList) {
  const file = fileList[0];
  const workbook = xlsx.readFile(file.path);
  const sheetName = workbook.SheetNames[0];
  const sheetJson = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  return preprocessExcelJson(sheetJson);
}

export function checkExcelTemplateIsValid(json, template) {
  switch (template) {
    case '4px':
      return check4PXTemplateIsValid(json);
    case 'yuntu':
      return checkYuntuTemplateIsValid(json);
    case 'zto_au':
      return checkZtoAUDirectLineTemplateIsValid(json);
    case 'zto_sg_my':
      return checkZtoSGMYDirectLineTemplateIsValid(json);
    case 'zto_au_post_zx':
      return checkZtoAuPostZxTemplateIsValid(json);
    case 'cne':
      return checkCneTemplateIsValid(json);
    case 'wanb':
      return checkWanbTemplateIsValid(json);
    case 'UBI':
      return checkUBITemplateIsValid(json);
    case 'ufl':
      return checkUflTemplateIsValid(json);
    case 'zto_hk_dhl':
      return checkZtoHkDhlTemplateIsValid(json);
    case 'zto_sz_fedex':
      return checkZtoSZFedexTemplateIsValid(json);
    case 'dhl_lax_ecom':
      return checkDhlLaxEcomIsValid(json);
    case 'zto_hkh':
      return checkZtoHKHTemplateIsValid(json);
    case 'ltian_ca_exp':
      return checkLtianCAExpressTemplateIsValid(json);
    case 'ltian_ca_sens':
      return checkLtianCASensitiveTemplateIsValid(json);
    case 'zto_ctwc':
      return checkZtoCtwcTemplateIsValid(json);
    case 'hsd_cs_post':
      return checkHsdCsPostTemplateIsValid(json);
    case 'hsd_epost':
      return checkHsdEPostTemplateIsValid(json);
    case 'hsd_nl_post':
      return checkHsdNLPostTemplateIsValid(json);
    case 'hsd_zh_epost':
      return checkHsdZHEPostTemplateIsValid(json);
    default:
      return true;
  }
}

export function handleTemplateJsonToCSVArray(json, template) {
  switch (template) {
    case '4px':
      return handle4pxExcelJson(json);
    case 'yuntu':
      return handleYuntuExcelJson(json);
    case 'zto_au':
      return handleZtoAUDirectLineExcelJson(json);
    case 'zto_sg_my':
      return handleZtoSGMYDirectLineExcelJson(json);
    case 'zto_au_post_zx':
      return handleZtoAuPostZxExcelJson(json);
    case 'cne':
      return handleCneExcelJson(json);
    case 'wanb':
      return handleWanbExcelJson(json);
    case 'UBI':
      return handleUBIExcelJson(json);
    case 'ufl':
      return handleUflExcelJson(json);
    case 'zto_hk_dhl':
      return handleZtoHkDhlExcelJson(json);
    case 'zto_sz_fedex':
      return handleZtoSZFedexExcelJson(json);
    case 'dhl_lax_ecom':
      return handleDhlLaxEcomJson(json);
    case 'zto_hkh':
      return handleZtoHKHExcelJson(json);
    case 'ltian_ca_exp':
      return handleLtianCAExpressExcelJson(json);
    case 'ltian_ca_sens':
      return handleLtianCASensitiveExcelJson(json);
    case 'zto_ctwc':
      return handleZtoCtwcExcelJson(json);
    case 'hsd_cs_post':
      return handleHsdCsPostExcelJson(json);
    case 'hsd_epost':
      return handleHsdEPostExcelJson(json);
    case 'hsd_nl_post':
      return handleHsdNLPostExcelJson(json);
    case 'hsd_zh_epost':
      return handleHsdZHEPostExcelJson(json);
    default:
      return [];
  }
}

function convertCSVArrayToExportCSVTemplate(json) {
  // 数据表格
  const table = [];
  table.push({
    A: '国家代码', // country_code
    B: '国家名称', // country_name
    C: '起始重量', // start_weight
    D: '结束重量', // end_weight
    E: '首重', // first_weight
    F: '首重费', // first_weight_fee
    G: '计费单位', // unit_weight
    H: '计费单位价格', // unit_weight_fee
    I: '燃油费', // fuel_fee
    J: '处理费', // processing_fee
    K: '挂号费', // registration_fee
    L: '杂费', // misc_fee
    M: '计费模式', // mode
    N: '渠道代码', // channel_code
    O: '区域', // zone
  });

  json.forEach((item) => {
    const row = {
      A: item.country_code || '',
      B: item.country_name || '',
      C: item.start_weight || 0,
      D: item.end_weight || 0,
      E: item.first_weight || 0,
      F: item.first_weight_fee || 0,
      G: item.unit_weight || 0,
      H: item.unit_weight_fee || 0,
      I: item.fuel_fee || 0,
      J: item.processing_fee || 0,
      K: item.registration_fee || 0,
      L: item.misc_fee || 0,
      M: COST_MODE_LABELS[item.mode] || '未知',
      N: item.channel_code || '',
      O: item.zone || '',
    };
    table.push(row);
  });
  return table;
}

function excelToJson(file, jsonHandler) {
  // eslint-disable-next-line no-undef
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = () => {
    const workbook = xlsx.read(reader.result, { type: 'buffer' });
    const firstSheetName = workbook.SheetNames[0];
    const sheetJson = xlsx.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
    jsonHandler(sheetJson);
  };
}

function convertExcel(file, template, errorHandler, type = 'csv') {
  excelToJson(file, (sheetJson) => {
    const jsonRows = preprocessExcelJson(sheetJson);
    if (!checkExcelTemplateIsValid(jsonRows, template)) {
      errorHandler('上传模板文件错误');
      return;
    }
    const csvRows = handleTemplateJsonToCSVArray(jsonRows, template);
    if (csvRows && csvRows.length > 0) {
      const date = dateFormat(new Date(), 'YYYY-mm-dd');
      const filename = `${template}_${date}.${type}`;
      const exportData = convertCSVArrayToExportCSVTemplate(csvRows);
      const ws = xlsx.utils.json_to_sheet(exportData, {
        skipHeader: true,
      });
      if (type === 'csv') {
        const csvString = xlsx.utils.sheet_to_csv(ws);
        downloadString(filename, csvString);
      } else {
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, filename);
        xlsx.writeFile(wb, filename, { bookType: type });
      }
    }
  });
}

export { convertExcel, excelToJson, channelTemplateList };
