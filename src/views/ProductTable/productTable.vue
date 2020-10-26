<template>
  <div>
    <h3>冻干粉针制剂生产批记录</h3>
    <span class="left-title">表格信息</span>
    <div class="table-wrapper">
      <table width="96%" class="product-table-header">
        <tr>
          <td>设备名称</td>
          <td>{{ params.deviceName }}</td>
        </tr>

        <tr>
          <td>生产批号</td>
          <td>{{tableInfo.BatchNo}}</td>
        </tr>
        <tr>
          <td>操作日期</td>
          <td>{{tableInfo.OptDate}}</td>
        </tr>

        <tr>
          <td>规格</td>
          <td>{{tableInfo.Spec}} mg/支</td>
        </tr>

        <tr>
          <td>生产批量</td>
          <td>{{tableInfo.LotSize}}</td>
        </tr>
        <tr>
          <td>制品冻干总数量</td>
          <td>{{tableInfo.TotalSize}}</td>
        </tr>
        <tr>
          <td>产品名称</td>
          <td>{{tableInfo.ProductName}}</td>
        </tr>
        <!-- <tr>
          <td>产品信息</td>
          <td>{{tableInfo.ProductInfor}}</td>
        </tr> -->
        <tr>
          <td>配方名称</td>
          <td>{{tableInfo.RecipeName}}</td>
        </tr>
      </table>
    </div>

    <span class="left-title">冻干机使用前确认</span>
      <div class="table-wrapper">
        <van-popup v-model="miejunshijianPickerVisible" position="bottom">
          <van-datetime-picker
            class="dataTimePicker"
            v-model="currentDate"
            type="datetime"
            title="选择完整时间"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="dataTimeCancel"
            @confirm="dataTimeConfirm('_miejunjieshushijian')"
          />
        </van-popup>
    
      <table width="96%" class="product-table-header">
        <tr>
          <td class="warn"></td>
          <td class="warn">数值</td>
          <td class="warn">单位</td>
          <td class="warn">参考标准/备注</td>
          <td class="warn">操作</td>
        </tr>

        <tr>
          <td>SIP温度</td>
          <td>
            {{preForm._SIPTemp}}
            <!-- v-model="preForm.SIPTemp" -->
          </td>
          <td>℃</td>
          <td></td>
          <td>
            <van-button @click="editData('冻干机SIP温度', '_SIPTemp')" class="submit" type="info" size="small">修&nbsp;改</van-button>
          </td>
        </tr>

        <tr>
          <td>SIP结束时间</td>
          <td>
            {{preForm._SIPDatetime}}
            <!-- <input class="table-input" type="text" v-model="preForm.SIPDatetime" /> -->
          </td>
          <td></td>
          <td></td>
          <td>
            <van-button @click="editDateTime('_SIPDatetime')" class="submit" type="info" size="small">修&nbsp;改</van-button>
          </td>
        </tr>

        <tr>
          <td>
            <!-- F<span class="small-point">0</span> -->
            F₀
          </td>
          <td>
            <!-- <input class="table-input" type="text" v-model="preForm.F0" /> -->
            {{preForm._F0}}
          </td>
          <td></td>
          <td>
            <!-- （F<span class="small-point">0</span>>15） -->
            F₀>15
          </td>
          <td>
            <van-button @click="editData('F₀', '_F0')" class="submit" type="info" size="small">修&nbsp;改</van-button>
          </td>
        </tr>

        <tr>
          <td>灭菌结束时间</td>
          <td>
            <!-- <input class="table-input" type="text" v-model="preForm._miejunjieshushijian" /> -->
            {{preForm._miejunjieshushijian}}
          </td>
          <td></td>
          <td></td>
          <td>
            <van-button @click="editDateTime('_miejunjieshushijian')" class="submit" type="info" size="small">修&nbsp;改</van-button>
          </td>
        </tr>

        <tr>
          <td>冻干机开始使用的时间</td>
          <td>
            <!-- <input class="table-input" type="text" v-model="preForm._miejunjieshushijian" /> -->
            {{preForm._kaixiaomenshijian}}
          </td>
          <td></td>
          <td>（开小门时间）</td>
          <td>
            <van-button @click="editDateTime('_kaixiaomenshijian')" class="submit" type="info" size="small">修&nbsp;改</van-button>
          </td>
        </tr>

        <tr>
          <td colspan="5">
            <van-checkbox class="" @click="submitData('_miejunjieshuzhikaishishijian', preForm._miejunjieshuzhikaishishijian)" v-model="preForm._miejunjieshuzhikaishishijian" label-position="left" shape="square">
              灭菌结束至开始使用的间隔时间（时间&lt;=72）
            </van-checkbox>
          </td>
        </tr>

        <tr>
          <td colspan="5">
            <van-checkbox class="" @click="submitData('_yierjibuqiguolvceshi', preForm._yierjibuqiguolvceshi)" v-model="preForm._yierjibuqiguolvceshi" label-position="left" shape="square">
              确认冻干机第一级，第二级补气过滤器使用前完整性测试合格
            </van-checkbox>
          </td>
        </tr>

        <tr>
          <td>
              冷冻水压力
          </td>
          <td>
            {{preForm._lengdongsuiyali}}
            <!-- <input class="table-input" type="text" v-model="preForm._lengdongsuiyali" /> -->
          </td>
          <td>MPa</td>
          <td>
            0.1～0.3MPa
          </td>
          
          <td>
            <van-button @click="editData('冷冻水压力', '_lengdongsuiyali')" class="submit" type="info" size="small">修&nbsp;改</van-button>
          </td>
        </tr>

        <tr>
          <td>冷冻水温度</td>
          <td>
            {{preForm._lengdongsuiwendu}}
            <!-- <input class="table-input" type="text" v-model="preForm._lengdongsuiwendu" /> -->
          </td>
          <td>℃</td>
          <td>
            2～8℃
          </td>

          <td>
            <van-button @click="editData('冷冻水温度', '_lengdongsuiwendu')" class="submit" type="info" size="small">修&nbsp;改</van-button>
          </td>
        </tr>

        <tr>
          <td>压缩空气压力</td>
          <td>
            {{preForm._yasuokongqiyali}}
            <!-- <input class="table-input" type="text" v-model="preForm._yasuokongqiyali" /> -->
          </td>
          <td>MPa</td>
          <td>0.4～0.7MPa</td>

          <td>
            <van-button @click="editData('压缩空气压力', '_yasuokongqiyali')" class="submit" type="info" size="small">修&nbsp;改</van-button>
          </td>
        </tr>

        <tr>
          <td colspan="5">
            <van-checkbox class="" @click="submitData('_wujunkongqijinqishoudongfa', preForm._wujunkongqijinqishoudongfa)" v-model="preForm._wujunkongqijinqishoudongfa" label-position="left" shape="square">
              确认无菌空气进气手动球阀已打开
            </van-checkbox>
          </td>
        </tr>

        <tr>
          <td colspan="5">
            <van-checkbox class="" @click="submitData('_mangbankapanquyangfa', preForm._mangbankapanquyangfa)" v-model="preForm._mangbankapanquyangfa" label-position="left" shape="square">
              确认冻干箱及后箱上所有盲板、门密封测试通道管路卡盘、氮气取样阀门均已紧固
            </van-checkbox>
          </td>
        </tr>

        <tr>
          <td colspan="5">
            <van-checkbox class="" @click="submitData('_xiaomenguanbiwurenhebaojin', preForm._xiaomenguanbiwurenhebaojin)" v-model="preForm._xiaomenguanbiwurenhebaojin" label-position="left" shape="square">
              确认制品已经全部送入冻干箱，小门已经关闭；确认报警画面中没有任何报警
            </van-checkbox>
          </td>
        </tr>

        <!-- <tr>
          <td colspan="4">
            <van-button class="submit" type="info" size="small">提&nbsp;交</van-button>
          </td>
        </tr> -->
      </table>
    </div>

    <span class="left-title">灌装前门密封测试</span>
    <div class="table-wrapper">
      <div :key="idx" v-for="(item, idx) in beforeForm">
        <table width="96%" class="product-table-header">
          <tr>
            <td class="tips" colspan="4">
              Tips：若第一次门密封测试不合格，找到不合格原因后，则需要进行连续两次测试合格后方可最终判定合格。每次进行门密封测试时均需要一份表单记录
            </td>
          </tr>
          <tr>
            <td colspan="2">冷凝器开始降温时间</td>
            <td colspan="2">
              {{item.T_CON_T_FALL}}
            </td>
          </tr>

          <tr>
            <td colspan="2">
              冷凝器降至-40度的时间
            </td>
            <td colspan="2">
              {{item.T_CON_40}}
            </td>
          </tr>

          <tr>
            <td colspan="2">打开真空泵的时间</td>
            <td colspan="2">
              {{item.VP_1}}
            </td>
            <!-- <td>
              冷凝器降压力降至-0.05Mpa，同时打开中隔阀的时间
            </td>
            <td>
              {{item.condense40Time}}
            </td> -->
          </tr>

          <!-- <tr>
            <td>
              冻干箱压力下降至-0.03Mpa以下时，关闭中隔阀的时间，开始保压1分钟的冻干箱压力值
            </td>
            <td colspan="2">
              {{item.startPressure}}
            </td>
            <td>MPa</td>
          </tr> -->

          <!-- <tr>
            <td>
              保压1分钟后的冻干箱压力值
            </td>
            <td colspan="2">
              {{item.afterPressure}}
            </td>
            <td>MPa</td>
          </tr> -->

          <tr>
            <td colspan="2">门密封测试结果</td>
            <td colspan="2">
              <van-radio-group direction="horizontal" @change="submitData('_fbmengmifenceshijieguo', item._fbmengmifenceshijieguo, 'radio')" v-model="item._fbmengmifenceshijieguo">
                <van-radio :name="true" shape="square">合格</van-radio>
                <van-radio :name="false" shape="square">不合格</van-radio>
              <!-- （小于0.003Mpa） -->
              </van-radio-group>
            </td>
          </tr>

          <tr>
            <td colspan="2">门密封测试结束时间</td>
            <td colspan="2">
              {{item.fbenddatetime}}
            </td>
          </tr>

          <!-- <tr>
            <td colspan="4">
              <van-button class="submit" type="info" size="small">提&nbsp;交</van-button>
            </td>
          </tr> -->
        </table>
      </div>
    </div>

    <span class="left-title">灌装过程中</span>
    <div class="table-wrapper">
      <table width="96%" class="product-table-header">
        <tr>
          <td class="tips" colspan="3">
            Tips：灌装过程中，对冻干板层进行温度控制，板层温度控制在25℃以下
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <Constant :query="params" :data="constantPointData" :history="historyData" />
          </td>
        </tr>
        <!-- <tr>
          <td class="warn">时间</td>
          <td class="warn">板层硅油进口温度</td>
          <td class="warn">板层硅油出口温度</td>
        </tr> -->

        <!-- <tr>
          <td>
            <input class="table-ipt" v-model="middleForm.time" type="text" />
          </td>
          <td>
            <input class="table-ipt" v-model="middleForm.inTemp" type="text" />
          </td>
          <td>
            <input class="table-ipt" v-model="middleForm.outTemp" type="text" />
          </td>
        </tr>

        <tr>
          <td>
            <input class="table-ipt" v-model="middleForm.time" type="text" />
          </td>
          <td>
            <input class="table-ipt" v-model="middleForm.inTemp" type="text" />
          </td>
          <td>
            <input class="table-ipt" v-model="middleForm.outTemp" type="text" />
          </td>
        </tr> -->

        <!-- <tr>
          <td colspan="3">
            <van-button class="submit" type="info" size="small">提&nbsp;交</van-button>
          </td>
        </tr> -->
      </table>
    </div>

    <span class="left-title">灌装后门密封测试</span>
    <div class="table-wrapper">
      <div :key="idx" v-for="(item, idx) in afterForm">
        <table width="96%" class="product-table-header">
          <tr>
            <td class="tips" colspan="4">
              Tips：若第一次门密封测试不合格，找到不合格原因后，则需要进行连续两次测试合格后方可最终判定合格。每次进行门密封测试时均需要一份表单记录
            </td>
          </tr>
          <tr>
            <td colspan="2">冷凝器开始降温时间</td>
            <td colspan="2">{{item.T_CON_T_FALL}}</td>
          </tr>

          <tr>
            <td colspan="2">
              冷凝器降至-40度的时间
            </td>
            <td colspan="2">{{item.T_CON_40}}</td>
          </tr>

          <tr>
            <td colspan="2">打开真空泵的时间</td>
            <td colspan="2">{{item.VP_1}}</td>
            <!-- <td>
              冷凝器降压力降至-0.05Mpa，同时打开中隔阀的时间
            </td>
            <td>{{item.condense40Time}}</td> -->
          </tr>

          <!-- <tr>
            <td>
              冻干箱压力下降至-0.03Mpa以下时，关闭中隔阀的时间，开始保压1分钟的冻干箱压力值
            </td>
            <td colspan="2">{{item.startPressure}}</td>
            <td>MPa</td>
          </tr> -->

          <!-- <tr>
            <td>
              保压1分钟后的冻干箱压力值
            </td>
            <td colspan="2">{{item.afterPressure}}</td>
            <td>MPa</td>
          </tr> -->

          <tr>
            <td colspan="2">门密封测试结果</td>
            <td colspan="2">
              <van-radio-group direction="horizontal" @change="submitData('_famengmifenceshijieguo', item._famengmifenceshijieguo, 'radio')" v-model="item._famengmifenceshijieguo">
                <van-radio :name="true" shape="square">合格</van-radio>
                <van-radio :name="false" shape="square">不合格</van-radio>
                <!-- （小于0.003Mpa） -->
              </van-radio-group>
            </td>
          </tr>

          <tr>
            <td colspan="2">门密封测试结束时间</td>
            <td colspan="2">{{item.faenddatetime}}</td>
          </tr>

          <!-- <tr>
            <td colspan="4">
              <van-button class="submit" type="info" size="small">提&nbsp;交</van-button>
            </td>
          </tr> -->
        </table>
      </div>
    </div>


    <span class="left-title">冻干步骤记录表</span>
    <van-steps direction="vertical" :active="active">
      <van-step :class="active >= 0 ? '': 'otherClass'">
        <span class="step-left-title">初始化开始</span>
        <div class="table-wrapper">
          <table width="96%" class="product-table-header">
            <tr>
              <td class="warn">参数</td>
              <td class="warn">实时数据</td>
              <!-- <td class="warn">审计数据</td> -->
            </tr>
            <tr>
              <td>前箱温度</td>
              <td>{{ recordTable['初始化']['LYO_AUTO_T_PRO_AVERAGE'] }} ℃</td>
              <!-- <td>2332℃</td> -->
            </tr>

            <tr>
              <td>前箱压力</td>
              <td>{{ recordTable['初始化']['LYO_AUTO_P_CHA'] }} Pa</td>
              <!-- <td>2332Pa</td> -->
            </tr>
          </table>
        </div>
      </van-step>

      <van-step :class="active >= 1 ? '': 'otherClass'">
        <span class="step-left-title">预冻开始</span>
        <div class="table-wrapper">
          <table width="96%" class="product-table-header">
            <tr>
              <td class="warn">参数</td>
              <td class="warn">审计数据</td>
              <td class="warn">参考标准</td>
            </tr>
            <tr>
              <td>预冻温度</td>
              <td>{{ recordTable['预冻开始']['LYO_PRECOOL_start_T_PRO_AVERAGE'] }} ℃</td>
              <td rowspan="2">预冻温度达到-59～-45℃、预冻总时间达到2～5小时</td>
            </tr>

            <tr>
              <td>预冻总时间</td>
              <td>{{ recordTable['预冻开始']['LYO_PRECOOL_start_datetime'] }}</td>
            </tr>
          </table>
        </div>
      </van-step>

      <van-step :class="active >= 2 ? '': 'otherClass'">
        <span class="step-left-title">预冻结束</span>
        <div class="table-wrapper">
          <table width="96%" class="product-table-header">
            <tr>
              <td class="warn">参数</td>
              <td class="warn">审计数据</td>
              <td class="warn">参考标准</td>
            </tr>
            <tr>
              <td>预冻温度</td>
              <td>{{ recordTable['预冻结束']['LYO_PRECOOL_end_T_PRO_AVERAGE'] }} ℃</td>
              <td rowspan="2">预冻温度达到-59～-45℃、预冻总时间达到2～5小时</td>
            </tr>

            <tr>
              <td>预冻总时间</td>
              <td>{{ recordTable['预冻结束']['LYO_PRECOOL_end_datetime'] }}</td>
            </tr>
          </table>
        </div>
      </van-step>

      <van-step :class="active >= 3 ? '': 'otherClass'">
        <span class="step-left-title">预抽真空开始</span>
        <div class="table-wrapper">
          <table width="96%" class="product-table-header">
            <tr>
              <td class="warn">参数</td>
              <td class="warn">数据</td>
            </tr>
            <tr>
              <td>真空度</td>
              <td>{{ recordTable['预抽真空开始']['LYO_CHA_EVA_start_P_CHA'] }} Pa</td>
            </tr>
          </table>
        </div>
      </van-step>

      <van-step :class="active >= 4 ? '': 'otherClass'">
        <span class="step-left-title">预抽真空结束</span>
        <div class="table-wrapper">
          <table width="96%" class="product-table-header">
            <tr>
              <td class="warn">参数</td>
              <td class="warn">数据</td>
              <td class="warn">参考标准</td>
            </tr>
            <tr>
              <td>真空度</td>
              <td>{{ recordTable['预抽真空结束']['LYO_CHA_EVA_end_P_CHA'] }} Pa</td>
              <td>不大于25Pa</td>
            </tr>
          </table>
        </div>
      </van-step>

      <van-step :class="active >= 5 ? '': 'otherClass'">
        <span class="step-left-title">一次升华开始</span>
        <div class="table-wrapper">
          <table width="96%" class="product-table-header">
            <tr>
              <td class="warn">参数</td>
              <td class="warn">数据</td>
            </tr>
            <tr>
              <td>前箱温度</td>
              <td>{{ recordTable['一次升华开始']['LYO_PRI_DRY_start_T_PRO_AVERAGE'] }} ℃</td>
            </tr>
            <tr>
              <td>前箱压力</td>
              <td>{{ recordTable['一次升华开始']['LYO_PRI_DRY_start_P_CHA'] }} Pa</td>
            </tr>
          </table>
        </div>
      </van-step>

      <van-step :class="active >= 6 ? '': 'otherClass'">
        <span class="step-left-title">一次升华结束</span>
        <div class="table-wrapper">
          <table width="96%" class="product-table-header">
            <tr>
              <td class="warn">参数</td>
              <td class="warn">数据</td>
            </tr>
            <tr>
              <td>前箱温度</td>
              <td>{{ recordTable['一次升华结束']['LYO_PRI_DRY_end_T_PRO_AVERAGE'] }} ℃</td>
            </tr>
            <tr>
              <td>前箱压力</td>
              <td>{{ recordTable['一次升华结束']['LYO_PRI_DRY_end_P_CHA'] }} Pa</td>
            </tr>
          </table>
        </div>
      </van-step>

      <van-step :class="active >= 7 ? '': 'otherClass'">
        <span class="step-left-title">有限泄漏开始</span>
        <div class="table-wrapper">
          <table width="96%" class="product-table-header">
            <tr>
              <td class="warn">参数</td>
              <td class="warn">数据</td>
              <td class="warn">参考标准</td>
            </tr>
            <tr>
              <td>有限泄漏总时间</td>
              <td>{{ recordTable['有限泄漏开始']['FiniteLeaked_start_datetime'] }}</td>
              <td>泄露总时间不少于2h</td>
            </tr>
          </table>
        </div>
      </van-step>

      <van-step :class="active >= 8 ? '': 'otherClass'">
        <span class="step-left-title">有限泄漏结束</span>
        <div class="table-wrapper">
          <table width="96%" class="product-table-header">
            <tr>
              <td class="warn">参数</td>
              <td class="warn">数据</td>
              <td class="warn">参考标准</td>
            </tr>
            <tr>
              <td>有限泄漏总时间</td>
              <td>{{ recordTable['有限泄漏结束']['FiniteLeaked_end_datetime'] }}</td>
              <td>泄露总时间不少于2h</td>
            </tr>
          </table>
        </div>
      </van-step>

      <van-step :class="active >= 9 ? '': 'otherClass'">
        <span class="step-left-title">高真空开始</span>
        <div class="table-wrapper">
          <table width="96%" class="product-table-header">
            <tr>
              <td class="warn">参数</td>
              <td class="warn">数据</td>
              <td class="warn">参考标准</td>
            </tr>
            <tr>
              <td>前箱温度</td>
              <td>{{ recordTable['高真空开始']['HighVacuum_start_T_PRO_AVERAGE'] }} ℃</td>
              <td rowspan="2">极限真空度（高真空结束时前箱压力）&lt; 10Pa;高真空总时间不少于2h.</td>
            </tr>
            <tr>
              <td>前箱压力</td>
              <td>{{ recordTable['高真空开始']['HighVacuum_start_P_CHA'] }} Pa</td>
            </tr>
          </table>
        </div>
      </van-step>

      <van-step :class="active >= 10 ? '': 'otherClass'">
        <span class="step-left-title">高真空结束</span>
        <div class="table-wrapper">
          <table width="96%" class="product-table-header">
            <tr>
              <td class="warn">参数</td>
              <td class="warn">数据</td>
              <td class="warn">参考标准</td>
            </tr>
            <tr>
              <td>前箱温度</td>
              <td>{{ recordTable['高真空结束']['HighVacuum_end_T_PRO_AVERAGE'] }} ℃</td>
              <td rowspan="3">极限真空度（高真空结束时前箱压力）&lt; 10Pa;高真空总时间不少于2h.</td>
            </tr>
            <tr>
              <td>前箱压力</td>
              <td>{{ recordTable['高真空结束']['HighVacuum_end_P_CHA'] }} Pa</td>
            </tr>
            <tr>
              <td>高真空总时间</td>
              <td>{{ recordTable['高真空结束']['HighVacuum_end_datetime'] }}</td>
            </tr>
          </table>
        </div>
      </van-step>

      <van-step :class="active >= 11 ? '': 'otherClass'">
        <span class="step-left-title">压力升测试</span>
        <div class="table-wrapper">
          <table width="96%" class="product-table-header">
            <tr>
              <td class="warn">参数</td>
              <td class="warn">数据</td>
              <td class="warn">参考标准</td>
            </tr>
            <tr>
              <td>测试前压力</td>
              <td>{{ recordTable['压力升']['LYO_PRE_RISE1_start_P_CHA'] }} Pa</td>
              <td rowspan="3">60s内真空上升值&lt;=10Pa</td>
            </tr>
            <tr>
              <td>测试后压力</td>
              <td>{{ recordTable['压力升']['LYO_PRE_RISE1_end_P_CHA'] }} Pa</td>
            </tr>
            <tr>
              <td>压力变化</td>
              <td>{{ recordTable['压力升']['LYO_PRE_RISE1_change_P_CHA'] }} Pa</td>
            </tr>
          </table>
        </div>
      </van-step>

      <van-step :class="active >= 12 ? '': 'otherClass'">
        <span class="step-left-title">冻干结束</span>
        <div class="table-wrapper">
          <table width="96%" class="product-table-header">
            <tr>
              <td class="warn">参数</td>
              <td class="warn">数据</td>
              <td class="warn">参考标准</td>
            </tr>
            <tr>
              <td>冻干周期</td>
              <td>{{ recordTable['冻干结束']['LYO_END_RESET_datetime'] }}</td>
              <td>20～36h</td>
            </tr>
          </table>
        </div>
      </van-step>
    </van-steps>


    <van-dialog v-model="alertVisible" title="确认" show-cancel-button @confirm="subData">
      <van-field label-width="100" v-model="editValue" :label="editText" />
    </van-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { apiConfig } from '@/config/apiConfig'
import { Http } from '@/utils/http'
import { Utils } from '@/utils/utils'
// import { Toast } from '@/utils/ui'
import { SocketData } from '@/models/socketData'
import Constant from '@/components/charts/constant'
import Highcharts from 'highcharts/highstock'

const WS_URL = apiConfig.WS_URL3
let ws = null

export default {
  name: 'productTable',
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      miejunshijianPickerVisible: false,
      subKey: '',
      SIPTemp: '',
      active: 11,
      alertVisible: false,
      editText: '',
      editValue: '',
      constantPointData: [], // 实时曲线
      historyData: [], // 历史曲线
      tableInfo: {
        RecipeName: '', // 配方名
        ProductName: '', // 产品名称
        BatchNo: '', // 批号
        Spec: '', // 规格
        TotalSize: '', // 冻干总数量
        ProductInfor: '', // 产品信息
        OptDate: '', // 操作日期
        LotSize: '' // 生产批量
      },
      preForm: {
        _SIPTemp: '',
        _SIPDatetime: '',
        _F0: '',
        _kaixiaomenshijian: '', // 开小门时间
        _miejunjieshushijian: '', // 灭菌结束时间
        _yierjibuqiguolvceshi: '', // 确认冻干机第一级，第二级补气过滤器使用前完整性测试合格
        _lengdongsuiyali: '', // 冷冻水压力
        _lengdongsuiwendu: '', // 冷冻水温度
        _yasuokongqiyali: '', // 空气压力
        _wujunkongqijinqishoudongfa: '', // 确认球阀已打开
        _mangbankapanquyangfa: '', // 均已紧固
        _xiaomenguanbiwurenhebaojin: '', // 报警
        _miejunjieshuzhikaishishijian: '' // 灭菌结束至开始使用的间隔时间（时间<=72）
      },
      beforeForm: [
        {
          T_CON_T_FALL: '', // 开始降温时间
          T_CON_40: '', // 冷凝-40时间
          VP_1: '', // 真空时间 
          // startPressure: '', // 保压前的压力值
          // afterPressure: '', // 保压后的压力值
          _fbmengmifenceshijieguo: '', // 测试结果
          fbenddatetime: '' // 测试结束时间
        }
      ],
      middleForm: {
        time: '',
        inTemp: '',
        outTemp: ''
      },
      afterForm: {
        T_CON_T_FALL: '', // 开始降温时间
        T_CON_40: '', // 冷凝-40时间
        VP_1: '', // 真空时间 
        _famengmifenceshijieguo: '', // 测试结果
        faenddatetime: '' // 测试结束时间
      },
      recordTable: {
        '初始化': {},
        '有限泄漏开始': {},
        '有限泄漏结束': {},
        '预抽真空开始': {},
        '预抽真空结束': {},
        '预冻开始': {},
        '预冻结束': {},
        '一次升华结束': {},
        '压力升': {},
        '高真空结束': {},
        '一次升华开始': {},
        '冻干结束': {},
        '高真空开始': {}
      },
      params: {
        numbereu: '',
        numberdescribe: '',
        deviceName: '',
        max: 30,
        min: 10
      }
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'signString'
    ])
  },
  created(){
    Highcharts.setOptions({
        global: {
          useUTC: false
        }
    })
    
    this.initSocket()
  },
  mounted(){
    if (this.$route.query.deviceId) {
      let { deviceId } = this.$route.query
      this.getHistoryChart(deviceId)
    } else {
      this.back()
      this.$toast({
        message: '数据点为空，无法查看',
        position: 'bottom'
      })
      return
    }
  },
  methods: {
    editDateTime(key){
      this.currentDate = new Date()
      this.miejunshijianPickerVisible = true
      this.subKey = key
    },
    editData(text, key){
      this.alertVisible = true
      this.editText = text
      this.editValue = ''
      this.subKey = key
    },
    // 提交修改值
    subData(){
      this.submitData(this.subKey, this.editValue)
    },
    dataTimeCancel(){
      this.miejunshijianPickerVisible = false
    },
    dataTimeConfirm(){
      this.$dialog.confirm({
        message: '确认提交？'
      }).then(() => {
        this.currentDate = String(this.currentDate.getTime())
        this.submitData(this.subKey, this.currentDate)
        this.miejunshijianPickerVisible = false
      })
    },
    // 初始化websocket
    initSocket () {
      const username = this.user.username,
            deviceId = this.$route.query.deviceId,
            socketModel = new SocketData(WS_URL)

      ws = socketModel.socket
      const openData = socketModel.open(username, deviceId)
      if(!openData) {
        this.$toast({
          message: '请重新登录',
          position: 'bottom'
        })
        this.$router.push('/login')
      }

      const messageData = socketModel.message(this.message)
    },
    async submitData(key, value, type){
      if(!key) return
      const { username, userid } = this.user,
            { deviceId } = this.$route.query,
            data = {
              ui: Utils.jsonToString({ username, userid }),
              deviceid: deviceId,
              brvalue: Utils.jsonToString({
                [key]: Object.prototype.toString.call(value) == '[object String]' ? value : type == 'radio' ? value : !value
              })
            }
// debugger
      const d = await Http.request({
        url: '/savebatchrecord',
        data,
        method: 'POST'
      })

      this.$toast({
        message: d.message,
        position: 'bottom'
      })
    },
    message(rec){
      console.log('rec', rec)

      this.tableInfo = rec[0]['表头']
      this.active = Number(rec[1]['步骤号'])
      this.preForm = rec[2]['使用前确认']

      this.beforeForm = rec[3]['灌装前门密封测试']
      this.afterForm = rec[5]['灌装后门密封测试']
      this.recordTable = rec[6]['冻干步骤记录']

      this.constantPointData = rec[4]
    },
    // 获取历史图表数据
    async getHistoryChart(deviceid) {
      const { username, userid } = this.user,
            url = '/gethschar',
            params = {
              ui: Utils.jsonToString({ username, userid }),
              deviceid
            }
      const data = await Http.request({
        url,
        data: params,
        method: 'POST'
      })

      if(data && data.length) {
        this.params = {
          numbereu: data[0][0]['numbereu'],
          numberdescribe: data[0][0]['numberdescribe'],
          deviceName: this.$route.query.deviceName
        }

        this.historyData = data
      }
    },
    back() {
      this.$router.back()
    }
  },
  components: {
    Constant
  },
  beforeDestroy () {
    if (ws) ws.close()
  }
}
</script>

<style>
.product-table-header {
  background: #fff;
  color: #fff;
  text-align: center;
  border: 1px solid #000;
  height: 80%;
  margin: 0 auto 20px auto;
}
.product-table-header td {
  background: rgb(7, 154, 12);
  font-size: 14px;
}
.left-title {
  color: #fff;
  background: #4197d5;
  padding: 2px 8px;
  border-radius: 0 0.8em 0.8em 0;
  font-size: 14px;
}
.step-left-title {
  color: #fff;
  background: #f00;
  padding: 2px 8px;
  border-radius: 0 0.8em 0.8em 0;
  font-size: 12px;
}
.table-ipt {
  display: inline-block;
  border: 1px solid #ddd;
  justify-content: center;
  width: 90%;
  height: 90%;
  color: #000;
  outline: none
}
.small-point {
  font-size: 12px;
  transform:scale(0.2);
  -webkit-transform:scale(0.2);
}
.table-wrapper {
  padding: 0 10px;
  margin: 20px 0 0 0;
}
.table-wrapper td {
  max-width: 90px;
  height: 2rem;
  min-width: 50px;
  padding: 2px;
  text-align: center;
}
.table-wrapper p{
  line-height: 30px;
}
.table-wrapper .van-checkbox__label, .table-wrapper .van-radio__label {
  color: #fff;
}
.table-wrapper .van-radio-group {
  justify-content: center;
}
.submit {
  margin: 6px 0;
}
.warn {
  background: #f00 !important;
}
.tips {
  background: #1989fa !important;
}
.otherClass .step-left-title {
  background: #ddd;
}
.otherClass td {
  background: #ddd;
}
.otherClass .warn {
  background: #ddd !important;
}
.table-input {
  width: 80px;
  height: 30px;
  color: #000;
}
</style>