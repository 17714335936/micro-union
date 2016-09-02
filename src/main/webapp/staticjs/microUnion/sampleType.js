$(document).ready(function() {
	getSampleType();
	
	  $("#sampleTypeInfo").on("click",'.thumbnail',function () {
		  var requUrl=basepath+"/sampleInput/sampleScan/scanIndex.action?id="+$(this).attr("data-hide");
		  window.location.href=requUrl;
	   });
});

var sampleTypeData=[];
var getSampleType=function(){
	var requUrl=basepath+"/sampleInput/sampleType/querySamplesTypes.action";
	$.ajax({
		type : 'post',
		url : requUrl,
		dataType : 'json',
		success : function(data) {
			var str="";
			for(var i=0;i<data.length;i++){
				sampleTypeData=data;
				str+='<div class="col-xs-6 col-sm-3 col-md-2"><div  class="thumbnail center-text" style="cursor:pointer;" data-hide="'+data[i].id+'">';
				str+='<img src="'+basepath+'/images/micro/IndexPage1.jpg" class="img-responsive" alt="'+data[i].sample_type+'" title="'+data[i].sample_type+'">';
				str+='<div class="caption" style="color:#6f7b8a;"><p>'+data[i].sample_type+'</p></div></div></div>';
			}
			$("#sampleTypeInfo").html(str);
		},error: function(e) { 
			
		} 
	});
}