<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="basePath" value="${pageContext.request.contextPath}" />
<c:set var="codeName" value='<%=request.getParameter("codeName")%>' />
<c:set var="sampleTypeId" value='<%=request.getParameter("sampleTypeId")%>' />
<c:set var="detectMothod" value='<%=request.getParameter("detectMothod")%>' />

<script type="text/javascript"> 
var basepath= "${basePath}";
var sampleTypeId= "${sampleTypeId}";
var detectMothod= "${detectMothod}";
</script>

<style type="text/css">

.labelCss{
    padding: 17px;
    margin-right: auto;
    margin-left: auto;
}

.handlerButton{
  background:#66ccff; 
  padding: 4px;
  border:1px solid #0000FF;
  font-size:14px;
  text-align: center; 
  border-radius: 12px;
}
.radio + .radio, .checkbox + .checkbox{
margin-top:5px;
}
</style>


<div class="container">


<div class="row"> 
    <div class="col-md-2 col-sm-4 col-xs-4" style="font-weight:bold;">
       <h3>玻片条码: </h3>
    </div>
    
    <div class="col-md-8 col-sm-6 col-xs-6 form-group" >
	    <input type="text" id="codeName"  name="codeName"   onkeypress="javascript:return gosearch();"/>
	    <button type="button"  class="btn btn-info" onclick="scanCode()" style="folat:right;">查询</button> 
    </div>
</div>

<div class="row"> 
    <div class="col-md-6 col-sm-6 col-xs-8">
       <h4 id="h4id"></h4>
    </div>
</div>
<div class="row"> 
<div id="rowContainer">
	<div id="sampleInputNote" class="row sampleInputNote" style="padding-left:30px;">
	</div>
</div>
</div>

</br>
<div class="row" >
     <div class="form-group"> 
        <label class="col-xs-6 control-label"></label> 
        <div class="col-xs-6" > 
            <button type="button" id="baoCunId" style="margin-left:20px;display:none; " class="btn btn-info" onclick="saveAndDealOther()">保存</button> 
        </div> 
    </div>
</div>
</div>

<script src="${basePath}/staticjs/experiment/jingJianSingle.js?t=<%=Math.random() %>"></script>

