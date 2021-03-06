var gridWidth;
var currentPage=1;
var rownum=10;
var myInterval ;
$(document).ready(function() {
	setNavigationBar("统计分析.png",basepath+"/analysisAction/index.action","统计分析");
	gridWidth = $("#samples-list").width();
	initAll();
});

//防止回车form提交,输入框回车进行查询
function gosearch() 
{ 
	if(window.event.keyCode == 13) 
	{ 
		initAll(); 
		return false; 
	} 
}

function initAll(){
	clearData();
	initSamplesTable();
}
function clearData(){
	//$('#samplesTableResult').html("");
	$('#samples-list').html("<table id='datagrid'></table><div><div id='pager' class='pager'></div></div>");
	
}
function getParams(){
	   var params = {};
	   params["page"] = currentPage;
	   params["rows"] = rownum; 
	   params["code"] = $("#codeName").val().trim(); 
	   return params;
}
function initSamplesTable() {
	$("#datagrid").jqGrid({
	    url : basepath+"/analysisAction/list.action",
	    postData : getParams(), //发送数据  
	    datatype : "json",
	    autoheight:true,
	    width : gridWidth,
	    height: 350,
	    shrinkToFit : jqGridWidthFit(gridWidth,120),
	    forceFit:true,
	    rownumbers : true,
	    colModel : [{
	        label : '医院条码',
	        name : 'hospital_code',
	        index : 'hospital_code',
	        width : 100,
	    },{
	        label : '瓶身条码',
	        name : 'bottle_code',
	        index : 'bottle_code',
	        width : 100
	    },{
	        label : '患者信息',
	        name : 'patient_info',
	        index : 'patient_info',
	        width : 60
	    },{
	        label : '录入时间',
	        name : 'receive_time',
	        index : 'receive_time',
	        width : 60
	    },{
	        label : '标本类型',
	        name : 'sample_type_name',
	        index : 'sample_type_name',
	        width : 60
	    },{
	        label : '当前状态',
	        name : 'status',
	        index : 'status',
	        width : 60
	    },{
	        label : '标本信息标志',
	        name : 'sample_content',
	        index : 'sample_content',
	        width : 60
	    }],
	    sortname : "id",
	    sortorder : "desc",
	    rowNum : rownum,
	    page : 1,
	    viewrecords : true,
	    altRows :true,
	    altclass:'someClass',
	    hidegrid : false,
	    //loadonce : true,
	    subGrid: true,
	    subGridRowExpanded: showChildGrid,
	    jsonReader : {
	        repeatitems : false
	    },
	    gridComplete : function() {        
	        jqGridpaper();
	        var grid = $("#datagrid");
	        var ids = grid.getDataIDs();
	        for (var i = 0; i < ids.length; i++) {
	         grid.setRowData ( ids[i], false, {height: 30} );
	        }
	    }
	});	
	function showChildGrid(parentRowID, parentRowKey) {
        var childGridID = parentRowID + "_table";
        var childGridPagerID = parentRowID + "_pager";

        // send the parent row primary key to the server so that we know which grid to show
        var childGridURL = 'sampleDetail.action?sampleId='+parentRowKey;

        // add a table and pager HTML elements to the parent grid row - we will render the child grid here
        $('#' + parentRowID).append('<table id=' + childGridID + '></table><div id=' + childGridPagerID + ' class=scroll></div>');

        $("#" + childGridID).jqGrid({
            url: childGridURL,
            mtype: "GET",
            datatype: "json",
            //page: 1,
            colModel: [
                { label: 'sn', name: 'id', key: true, hidden: true },
                { label: '条形码', name: 'code_no', width: 100,
                	formatter : function(v, opt, rec) {
                		if(rec.child_id != null && rec.child_id!=''){
                			v=v+'#'+rec.child_id;
                		}
        				return v;
        			}	
                },
                { label: '类型', name: 'detect_method', width: 100,
                	formatter : function(v, opt, rec) {
        				switch (v) {
        				case '1':
        					v = "染色镜检";
        					break;
        				case '2':
        					v = "转种平板";
        					break;		
        				case '3':
        					v = "直接鉴定";
        					break;
        				default:
        					v = "未知";
        					break;
        				}
        				return v;
        			}	      	
                 },
                { label: '操作', name: 'detect_type', width: 100},
                { label: '打印时间', name: 'print_time', width: 100 },
                { label: '处理时间', name: 'deal_time', width: 100 },
                { label: '状态', name: 'status', width: 100 },
                { label: '鉴定结果', name: 'content', width: 100 }
            ],
			loadonce: true,
            width: gridWidth-100,
            height:  "auto",
            subGrid: true,
    	    subGridRowExpanded: showChildDetects,
            jsonReader : {
     	        repeatitems : false
     	    },
      	    gridComplete : function() {        
      		  if($("#" + childGridID).find('tr').size()<=1){
      			 $("#" + parentRowID).hide();
      		  }
      	    }
            //pager: "#" + childGridPagerID
        });
	}
	function showChildDetects(parentRowID, parentRowKey) {
        var childGridID = parentRowID + "_table";
        var childGridPagerID = parentRowID + "_pager";
        var widthchind = $('#' + parentRowID).width()-25;
        // send the parent row primary key to the server so that we know which grid to show
        var childGridURL = 'detectsDetail.action?parentId='+parentRowKey;

        // add a table and pager HTML elements to the parent grid row - we will render the child grid here
        $('#' + parentRowID).append('<table id=' + childGridID + '></table><div id=' + childGridPagerID + ' class=scroll></div>');

        $("#" + childGridID).jqGrid({
            url: childGridURL,
            mtype: "GET",
            datatype: "json",
            //page: 1,
            colModel: [
                { label: 'sn', name: 'id', key: true, hidden: true },
                { label: '条形码', name: 'code_no', key: true, width: 100 ,
                	formatter : function(v, opt, rec) {
                		if(rec.child_id != null && rec.child_id!=''){
                			v=v+'#'+rec.child_id;
                		}
        				return v;
        			}
                },
                { label: '类型', name: 'detect_method', width: 100,
                	formatter : function(v, opt, rec) {
        				switch (v) {
        				case '1':
        					v = "染色镜检";
        					break;
        				case '2':
        					v = "转种平板";
        					break;		
        				case '3':
        					v = "直接鉴定";
        					break;
        				default:
        					v = "未知";
        					break;
        				}
        				return v;
        			}	      	
                 },
                { label: '操作', name: 'detect_type', width: 100},
                { label: '打印时间', name: 'print_time', width: 100 },
                { label: '处理时间', name: 'deal_time', width: 100 },
                { label: '状态', name: 'status', width: 100 },
                { label: '鉴定结果', name: 'content', width: 100 }
            ],
			loadonce: true,
            width: widthchind,
            height:  "auto",
            subGrid: true,
    	    subGridRowExpanded: showChildDetects,
            jsonReader : {
     	        repeatitems : false
     	    },
     	   gridComplete : function() {        
     		  if($("#" + childGridID).find('tr').size()<=1){
     			 $("#" + parentRowID).hide();
     		  }
     		  
     	   }
            //pager: "#" + childGridPagerID
        });
        
	}
}
function jqGridpaper() {
    $.jqGridajaxPager.pager("datagrid", function(
            clickNum, el) {
        currentPage=clickNum;
        var params = getParams();
        $("#datagrid").jqGrid('setGridParam', {
            postData : params, //发送数据 
            page : clickNum
        }).trigger("reloadGrid");
    }, "pager");
}
/*定时刷新虚机信息*/
/*$("#timeRefresh").click(function(){
	var flag=$("#timeRefresh").is(':checked');
	if(flag){
		myInterval= window.setInterval(initAll,refresh);
	}else{
		window.clearInterval(myInterval);
	}
});*/

/*手动刷新虚机信息*/
$("#manualRefresh").click(function(){
	initAll();
});
