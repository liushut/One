/**
 * Created by SmallAiTT on 2015/7/11.
 */

var path = require('path');
var env = require('./env.js');

exports.proj_dir = path.join(__dirname, '../../');

// 客户端根目录
exports.client_dir = path.join(exports.proj_dir, 'client');
// 皮肤根目录
exports.client_skins_dir = path.join(exports.client_dir, 'src/skins');
exports.client_resource_dir = path.join(exports.client_dir, 'resource');
// ui资源目录
exports.client_resource_ui_dir = path.join(exports.client_resource_dir, 'ui2');
exports.client_shared = path.join(exports.client_resource_dir, 'shared');
exports.client_auto = path.join(exports.proj_dir, 'client/src/xlsx');

// docs 目录
exports.docs_dir = path.join(exports.proj_dir, '../', env.DOSC);
exports.assets_dir = path.join(exports.docs_dir, 'assets');
exports.wing_dir = path.join(exports.assets_dir, env.WING_NAME);
exports.wing_skins_dir = path.join(exports.wing_dir, 'src/skins');
exports.wing_resource_dir = path.join(exports.wing_dir, 'resource');
exports.wing_resource_ui_dir = path.join(exports.wing_resource_dir, 'ui');

exports.docs_audio = path.join(exports.assets_dir, "audio_zip");
exports.docs_cca = path.join(exports.assets_dir, "cca");
exports.docs_images = path.join(exports.assets_dir, "images");
exports.docs_static = path.join(exports.docs_images, "static");
exports.docs_dynamic = path.join(exports.docs_images, "dynamic");

// 模板根目录
exports.template_dir = path.join(__dirname, '../template');
// 组件的根目录
exports.template_comp_dir = path.join(exports.template_dir, 'comp');


exports.uiModuleIgnores = ["preview"];


exports.imgScale = 1;

// tools相关目录
exports.tools_dir = path.join(exports.proj_dir, 'tools');
exports.config_xlsx = path.join(exports.tools_dir, "xlsx");