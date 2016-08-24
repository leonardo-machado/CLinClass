/**********************/
/* Local Storage Load */
/**********************/

/* Entity Constants */
USER_ENTITY = "user";
//MYGROUP_ENTITY = "mygroup";
MSG_ENTITY = "messages";
CFG_ENTITY = "config";
CLASS_ENTITY = "class";
STUDENT_ENTITY = "student";
GROUP_ENTITY = "group";
ACTIVITIE_ENTITY = "activitie";
INDIVIDUAL_RESPONSE_ENTITY = "individual_response";
MATERIAL_ENTITY = "material";

function persist(entity, obj){
   localStorage.setItem(entity,angular.toJson(obj));
}

function load(entity){
   return angular.fromJson(localStorage.getItem(entity));
}

/**********************************/
/* Initizalize Persistent Objects */
/**********************************/
//** USER
var userPO = load(USER_ENTITY);

if (userPO == null || userPO == "undefined"){
   userPO = {classroom:"",name:"",email:"",password:"",groupID:"-1",teacher:false};
   persist(USER_ENTITY,userPO);
}

//** MYGROUP
//var mygroupPO = load(MYGROUP_ENTITY);

//if (mygroupPO == null || mygroupPO == "undefined"){
//   mygroupPO = {groupID:"-1"};
//   persist(MYGROUP_ENTITY,mygroupPO);
//}

//mygroupPO.groupID = 0;

//** MESSAGES
var msgPO = load(MSG_ENTITY);

if (msgPO == null || msgPO == "undefined" || !isArray(msgPO)){
   msgPO = [];
   persist(MSG_ENTITY,msgPO);
}

//** CONFIG
var configPO = load(CFG_ENTITY);

if (configPO == null || configPO == "undefined"){
   configPO = {language:"pt"};
   persist(CFG_ENTITY,configPO);
}

//** CLASS
var classPO = load(CLASS_ENTITY);

if (classPO == null || classPO == "undefined"){
   classPO = [];
   persist(CLASS_ENTITY,classPO);
}

//** STUDENT
var studentPO = load(STUDENT_ENTITY);

if (studentPO == null || studentPO == "undefined"){
   studentPO = [];
   persist(STUDENT_ENTITY,studentPO);
}

//** GROUP
var groupPO = load(GROUP_ENTITY);

if (groupPO == null || groupPO == "undefined" || !isArray(groupPO)){
   groupPO = [];
   persist(GROUP_ENTITY,groupPO);
}

//** ACTIVITIE
var activitiePO = load(ACTIVITIE_ENTITY);

if (activitiePO == null || activitiePO == "undefined" || !isArray(activitiePO)){
   activitiePO = [];
   persist(ACTIVITIE_ENTITY,activitiePO);
}

//** INDIVIDUAL_RESPONSE
var responsePO = load(INDIVIDUAL_RESPONSE_ENTITY);

if (responsePO == null || responsePO == "undefined" || !isArray(responsePO)){
   responsePO = [];
   persist(INDIVIDUAL_RESPONSE_ENTITY,responsePO);
}

//** MATERIAL
var materialPO = load(MATERIAL_ENTITY);

if (materialPO == null || materialPO == "undefined" || !isArray(materialPO)){
   materialPO = [];
   persist(MATERIAL_ENTITY,materialPO);
}

/**********************************/
/* Internet Connection Controller */
/**********************************/
var rootFirebase = "https://<database_name>.firebaseio.com";
var refFirebase = new Firebase(rootFirebase);
/**********************************/


function isArray(arg){
   return Object.prototype.toString.call(arg) === '[object Array]';
}
/**********************************/



// 
// Here is how to define your module 
// has dependent on mobile-angular-ui
// 
var app = angular.module('CLinClass', [
  'ngRoute',
  'mobile-angular-ui',
  
  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'
  // it is at a very beginning stage, so please be careful if you like to use
  // in production. This is intended to provide a flexible, integrated and and 
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like 
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures',
  'firebase'
]);

// 
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false' 
// in order to avoid unwanted routing.
// 
app.config(function($routeProvider) {
  $routeProvider.when('/',              {templateUrl: 'login.html', reloadOnSearch: false});
  $routeProvider.when('/menu',          {templateUrl: 'home_student.html', reloadOnSearch: false});
  $routeProvider.when('/menuProf',      {templateUrl: 'monitor.html', reloadOnSearch: false});
  $routeProvider.when('/messages',      {templateUrl: 'messages.html', reloadOnSearch: false});
  $routeProvider.when('/configStudent', {templateUrl: 'configStudent.html', reloadOnSearch: false});
  $routeProvider.when('/class',         {templateUrl: 'class.html', reloadOnSearch: false});
  $routeProvider.when('/student',       {templateUrl: 'student.html', reloadOnSearch: false});
  $routeProvider.when('/configTeacher', {templateUrl: 'configStudent.html', reloadOnSearch: false});
  $routeProvider.when('/groups'       , {templateUrl: 'groups.html', reloadOnSearch: false});
  $routeProvider.when('/activities',    {templateUrl: 'activities.html', reloadOnSearch: false}); 
  $routeProvider.when('/parson'    ,    {templateUrl: 'activity.html', reloadOnSearch: false}); 
  $routeProvider.when('/material'  ,    {templateUrl: 'material.html', reloadOnSearch: false}); 
  $routeProvider.when('/materialCad',   {templateUrl: 'materialCad.html', reloadOnSearch: false});
  $routeProvider.when('/mygroup'    ,   {templateUrl: 'mygroup.html', reloadOnSearch: false});
  $routeProvider.when('/consensus'  ,   {templateUrl: 'consensus.html', reloadOnSearch: false});
  $routeProvider.when('/activityConsensus',{templateUrl: 'activityConsensus.html', reloadOnSearch: false}); 
  

  //$routeProvider.when('/scroll',        {templateUrl: 'scroll.html', reloadOnSearch: false}); 
  //$routeProvider.when('/tabs',          {templateUrl: 'tabs.html', reloadOnSearch: false}); 
  //$routeProvider.when('/accordion',     {templateUrl: 'accordion.html', reloadOnSearch: false}); 
  //$routeProvider.when('/overlay',       {templateUrl: 'overlay.html', reloadOnSearch: false}); 
  //$routeProvider.when('/dropdown',      {templateUrl: 'dropdown.html', reloadOnSearch: false});
  //$routeProvider.when('/drag',          {templateUrl: 'drag.html', reloadOnSearch: false});
  //$routeProvider.when('/carousel',      {templateUrl: 'carousel.html', reloadOnSearch: false});
});

// Cria a diretiva auto-focus, usada na tela de mensagem
app.directive('autoFocus', function($timeout) {
    return {
        restrict: 'AC',
        link: function(_scope, _element) {
            $timeout(function(){
                _element[0].focus();
            }, 0);
        }
    };
});

app.factory('Messages', function () {
    return {msg_list: msgPO};
});

app.controller('MainController', function($rootScope, $scope, $window, $location, $route, Messages, $firebaseAuth, $firebaseArray, $timeout, $sce){
  $scope.netConnection = false;
  
  refFirebase.child('.info/connected').on('value', function(connectedSnap) {
    if (connectedSnap.val() === true) {
       $scope.netConnection = true;
	   // Inicia o sistema de mensagem
	   //$scope.initMessageListner();
	   // Envia as respostas para o servidor
	   $scope.sendToServer();
    } else {
       $scope.netConnection = false;
    }
	
    //$scope.$apply();
  });

  // Language values
  if (configPO.language == "en"){
     $scope.i18n = $i18n_en;
  } else {
     $scope.i18n = $i18n_pt;
  }
  
  // Load Firebase Auth Object
  $scope.authObj = $firebaseAuth(refFirebase);

  // User agent displayed in home page
  $scope.userAgent = navigator.userAgent;
  
  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function(){
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.loading = false;
  });
  
  // Método back()
  $scope.back = function() {
    $window.history.back();
	
     if($rootScope.backMessage && ($rootScope.activityToExec.type == 2 || $rootScope.consensusToExec.type == 2)){
	    $timeout($scope.loadParson, 200);
	    $timeout($scope.loadParsonConsensus, 200);
	}
  };  

  // Load data
  $scope.firebaseSearch = function(entity, field, value, callback){
   var ref = new Firebase(rootFirebase).child(entity);
   var query = ref.orderByChild(field).equalTo(value);
   var list = $firebaseArray(query);
   list.$loaded().then(function(x) {
      callback(x);
   });
  }

  // Load All Data
  $scope.firebaseSelectAll = function(entity, field, callback){
   var ref = new Firebase(rootFirebase).child(entity);
   var query = ref.orderByChild(field);
   var list = $firebaseArray(query);
   list.$loaded().then(function(x) {
      callback(x);
   });
  }

  $scope.renderHtml = function (htmlCode) {
    return $sce.trustAsHtml(htmlCode);
  };  
  // 
  // 'Scroll' screen
  // 
  //var scrollItems = [];
  //
  //for (var i=1; i<=100; i++) {
  //  scrollItems.push($scope.i18n.Activity + ' ' + i);
  //}
  //
  //$scope.scrollItems = scrollItems;


  /**********************/
  /*   Messages Screen  */
  $scope.Messages = Messages.msg_list; 
  $scope.addMessage = false;
  $scope.msgText = '';
  $scope.teacherNotify = false;
  $scope.toGroup = '';
  $scope.toStudent = 'Todos';
  //$scope.msgNotRead = 0;
  //$scope.$apply();

  $scope.cleanMessages = function(){
     if($scope.Messages.length > 100){
        $scope.Messages.splice(100);
	 }
  }
  
  $scope.updateUserStatus = function(){
     $scope.sendPulse = false;
     $scope.sendMsgRead = true;
     $scope.firebaseSearch("User_Status","email",$scope.userVO.email,$scope.userStatus_callback);
  }

  $scope.addMessage_Click = function() {
     $scope.addMessage = !$scope.addMessage;
  };
  
  $scope.sendMessage = function() {
	 var now = new Date();
	 var msg;

	 // Se for papel de aluno
	 if($scope.userVO.role == 0){
	    msg = { name: $scope.userVO.name, text: $scope.msgText, date: now.format("dd/mm/yyyy"), hour: now.format("HH:MM"), teacher: false, teacherNotify: $scope.teacherNotify, groupID: $scope.userVO.groupID};
	 } else {
	    // se for papel de professor
		group = $scope.toGroup;
		
		if($scope.toStudent != 'Todos'){
		   group = $scope.toStudent;
		}
		
	    msg = { name: $scope.userVO.name, text: $scope.msgText, date: now.format("dd/mm/yyyy"), hour: now.format("HH:MM"), teacher: true, teacherNotify: $scope.teacherNotify, groupID: group};
	 }

	 if($scope.netConnection){
        var messagesRef = refFirebase.child("Messages");
        messagesRef.push(msg);
	 
	    $scope.msgText = '';
	    $scope.teacherNotify = false;
		
	    try {
	       $scope.$apply();
	    }catch(e){ 
	    }
	} else {
	   alert($scope.i18n.NotSendMessageOffline);
	}
  };
  
  $scope.saveMessage = function(snapshot){
      //GET DATA
	   var msgFinded = false;
       var data = snapshot.val();
       var message = { name: data.name || "anonymous", 
	                   text: data.text, 
					   date: data.date, 
					   hour: data.hour, 
					   received: data.name != userPO.name, 
					   teacher: data.teacher, 
					   teacherNotify: data.teacherNotify};
       
	   for(i in $scope.Messages){
	      if($scope.Messages[i].date == message.date && $scope.Messages[i].hour == message.hour && $scope.Messages[i].text == message.text){
		     msgFinded = true;
			 break;
		  }
	   }
	   
	   if(!msgFinded){
	      $scope.Messages.unshift(message);
	      
	      if(message.received && $location.path() != "/messages"){
	         $scope.msgNotRead++;
	      }
	      
	      /**********************************/
	      /* Armazena as mensagens no cache */
	      /**********************************/
	      //msgPO.unshift(message);
	      $scope.cleanMessages();
	      persist(MSG_ENTITY,msgPO);
	      /**********************************/
	      
	      try {
	         $scope.$apply();
	      }catch(e){ 
	      }
       }
  }
  
  $scope.initMessageListner = function(){
     var messagesRef = refFirebase.child("Messages");
     $scope.msgNotRead = 0;
	 messagesRef.off('child_added');
	 
	 if($scope.userVO.role == 0){
       // Carrega as mensagens do Grupo
       messagesRef.orderByChild("groupID").equalTo($scope.userVO.groupID).limitToLast(100).on('child_added', function (snapshot) {
          $scope.saveMessage(snapshot);
       });

       // Carrega as mensagens do Usuário
       messagesRef.orderByChild("groupID").equalTo($scope.userVO.email).limitToLast(100).on('child_added', function (snapshot) {
          $scope.saveMessage(snapshot);
       });
     } else {
	   // Carrega as mensagens enviadas para o professor
       messagesRef.orderByChild("date").limitToLast(200).on('child_added', function (snapshot) {
          var data = snapshot.val();
		  
		  if((data.teacherNotify && $scope.isMyClass(data.groupID)) || (data.teacher && data.name == $scope.userVO.name)){
            $scope.saveMessage(snapshot);
		  }
       });
     }     
  }
  
  $scope.isMyClass = function(id){
     for(i in $scope.groupVO){
	    if($scope.groupVO[i].code == id && $scope.groupVO[i].classroom == $scope.userVO.classroom){
		   return true;
		}
	 }
	 
	 return false;
  }
  
  $scope.getGroupOptions = function(){
    var html = '';

	for(i in $scope.groupVO){
	   if($scope.groupVO[i].classroom == $scope.userVO.classroom && $scope.groupVO[i].active == true){
          html = html + '<option value="' + $scope.groupVO[i].code + '">' + $scope.groupVO[i].name + '</option>';
	   }
	}
	
	return html;
  }
  
  $scope.getUserOptions = function(){
    var html = '<option value="Todos">' + $scope.i18n.All +'</option>';

	for(i in $scope.studentVO){
	   if($scope.studentVO[i].classroom == $scope.userVO.classroom && $scope.studentVO[i].teacher == false){
          html = html + '<option value="' + $scope.studentVO[i].email + '">' + $scope.studentVO[i].name + '</option>';
	   }
	}
	
	return html;
  }
  /**********************/
	  
  /**********************/
  /* Login screen       */
  if (typeof($scope.userVO) == "undefined" ){
    $scope.userVO = {
	  	  classroom: userPO.classroom,
	  	  name: userPO.name,
	  	  email: userPO.email,
	  	  password: userPO.password,
	  	  role: 0,
	  	  logged: false,
	  	  teacher: userPO.teacher,
	  	  groupID: userPO.groupID
    };
  }
  
  $scope.login_callback = function(x) {
	var user = x;
	
	userPO.classroom = user[0].classroom;
	userPO.name = user[0].name;
	userPO.email = $scope.userVO.email;
	userPO.password = $scope.userVO.password;
    userPO.teacher = (user[0].teacher == "true" || user[0].teacher == true);
    userPO.groupID = user[0].groupID;
	//
	persist(USER_ENTITY,userPO);
	//
    $scope.userVO.classroom = userPO.classroom;
	$scope.userVO.name      = userPO.name;
	$scope.userVO.email     = userPO.email;
	$scope.userVO.password  = userPO.password;
	$scope.userVO.teacher   = userPO.teacher;
	$scope.userVO.groupID   = userPO.groupID;
	
	if(!userPO.teacher && $scope.userVO.role == 1){
	   alert($scope.i18n.RoleNotPermitted);
	} else {
	   if($scope.userVO.role == 1){
	      $location.path("/menuProf");
	   } else {
	      $location.path("/menu");
	   }
	   $scope.userVO.logged = true;

	   // Chama o método de inicialização
	   $scope.initialize();
	   
	   if(!userPO.teacher && userPO.groupID == "-1"){
	      alert($scope.i18n.ChooseAGroup);
	   }
	}
  }

  $scope.login = function() {
    if($scope.netConnection){
      $scope.authObj.$authWithPassword({
        email: $scope.userVO.email,
        password: $scope.userVO.password
      }).then(function(authData) {
		   $scope.firebaseSearch("Users", "email",$scope.userVO.email,$scope.login_callback);
      }).catch(function(error) {
		  alert($scope.i18n.LoginFailure);
      });	  
	} else {
	   if(userPO.email == "" || userPO.password == ""){
	      alert($scope.i18n.LoginFailure1Access);
	   } else {
	      if(userPO.email == $scope.userVO.email && userPO.password == $scope.userVO.password){
		     if(!userPO.teacher && $scope.userVO.role == 1){
		        alert($scope.i18n.RoleNotPermitted);
		     } else {
			    if($scope.userVO.role == 1){
				  $location.path("/menuProf");
				} else {
		          $location.path("/menu");
				}
	            $scope.userVO.logged = true;
		     }
          } else {
		     alert($scope.i18n.LoginFailure);
		  }
	   }
	}
  };

  $scope.exit = function() {
	  $scope.userVO.role = 0;
	  $scope.userVO.logged = false;
  };
  /**********************/

  /**********************/
  /* Config Student     */
  $scope.configVO = configPO;
  
  $scope.clearUserInfo = function(){
     userPO = {};
	 persist(USER_ENTITY, userPO);
   
     //mygroupPO = {groupID:"-1"};
     //persist(MYGROUP_ENTITY,mygroupPO);	 
	 
	 alert($scope.i18n.ConfigCleaned);
  }

  $scope.clearMessages = function(){
     msgPO = [];
     persist(MSG_ENTITY,msgPO);
	 alert($scope.i18n.ConfigCleaned);
  }

  $scope.saveConfig = function(){
     persist(CFG_ENTITY,configPO);
	 alert($scope.i18n.ConfigSaved);
  }
  /**********************/

  /**********************/
  /* Class              */
  $scope.classVO = classPO;
  $scope.addClass = false;
  //$scope.class_name = '';
  $scope.classroom  = {code:'',name:''};
  
  $scope.getClassName = function(x){
    var name = '';
	
	for(var i=0; i < $scope.classVO.length;i++){
	   if($scope.classVO[i].code == x){
	      name = $scope.classVO[i].name;
		  break;
	   }
	}
	
    return name;
  }

  $scope.class_callback = function(x){
	 $scope.classVO.splice(0,$scope.classVO.length);
     for(var i = 0; i < x.length; i++){
        $scope.classVO.push(x[i]);	 
	 }
  }

  $scope.loadClass = function(){
     $scope.firebaseSelectAll("Class","name",$scope.class_callback);
  }
  
  $scope.addClass_Click = function() {
     $scope.addClass = !$scope.addClass;
  };
  
  $scope.saveClass = function() {
	 var classRoom = {code: $scope.classroom.code, name: $scope.classroom.name};

	 if($scope.netConnection){
        var classRef = refFirebase.child("Class");
        classRef.push(classRoom);
		
		$scope.classVO.push(classRoom);
        persist(CLASS_ENTITY,classPO);

	 
	    $scope.classroom.code = '';
		$scope.classroom.name = '';
        $scope.addClass = false;
	} else {
	   alert($scope.i18n.NotSaveClassOffline);
	}
  };

  $scope.removeClass = function(item) {
     var result = confirm($scope.i18n.ConfirmClassRemove);
	 
	 if(!result){
	    return;
	 }
	 
	 if($scope.netConnection){
        var classRef = refFirebase.child("Class");
    	classRef.off('child_added');
        classRef.orderByChild("name").equalTo(item.name).on('child_added', function (snapshot) {
           var ref = snapshot.ref();
		   ref.remove();
		   
		   var index = $scope.classVO.indexOf(item);
		   if (index > -1) {
		      $scope.classVO.splice(index, 1);
			  persist(CLASS_ENTITY,classPO);
			  $scope.$apply();
		   }
        });
	 } else {
	   alert($scope.i18n.NotRemoveClassOffline);
	}
  };
  /**********************/

  /**********************/
  /* Student            */
  $scope.studentVO  = studentPO;
  $scope.addStudent = false;
  $scope.student    = {classroom:'',name:'',email:'',password:'',teacher:false};
  
  $scope.student_callback = function(x){
	 $scope.studentVO.splice(0,$scope.studentVO.length);
     for(var i = 0; i < x.length; i++){
        $scope.studentVO.push(x[i]);	 
	 }
     persist(STUDENT_ENTITY,studentPO);
  }

  $scope.loadStudent = function(){
     $scope.firebaseSelectAll("Users","name",$scope.student_callback);
  }

  $scope.addStudent_Click = function() {
     $scope.addStudent = !$scope.addStudent;
  };
  
  $scope.saveStudent = function() {
	 var student = {classroom: $scope.student.classroom,name: $scope.student.name, email: $scope.student.email, password: $scope.student.password, groupID: "-1", teacher: $scope.student.teacher};

	 if($scope.netConnection){
        var usersRef = refFirebase.child("Users");
        usersRef.push(student);
		
		$scope.studentVO.push(student);
        persist(STUDENT_ENTITY,studentPO);

	 
	    $scope.student.classroom = '';
	    $scope.student.name      = '';
	    $scope.student.email     = '';
	    $scope.student.password  = '';
	    $scope.student.teacher   = false;
        $scope.addStudent = false;
	} else {
	   alert($scope.i18n.NotSaveStudentOffline);
	}
  };

  $scope.removeStudent = function(item) {
     var result = confirm($scope.i18n.ConfirmStudentRemove);
	 
	 if(!result){
	    return;
	 }
	 
	 if($scope.netConnection){
        var studentRef = refFirebase.child("Users");
    	studentRef.off('child_added');
        studentRef.orderByChild("email").equalTo(item.email).on('child_added', function (snapshot) {
           var ref = snapshot.ref();
		   ref.remove();
		   
		   var index = $scope.studentVO.indexOf(item);
		   if (index > -1) {
		      $scope.studentVO.splice(index, 1);
			  persist(STUDENT_ENTITY,studentPO);
			  $scope.$apply();
		   }
        });
	 } else {
	   alert($scope.i18n.NotRemoveStudentOffline);
	}
  };
  /**********************/

  /**********************/
  /* Group              */
  $scope.groupVO  = groupPO;
  $scope.addGroup = false;
  $scope.group    = {classroom:'',code:'',name:'',complete:false,max_member:0,active:false};
  
  $scope.group_callback = function(x){
	 $scope.groupVO.splice(0,$scope.groupVO.length);
     for(var i = 0; i < x.length; i++){
        $scope.groupVO.push(x[i]);	 
	 }
     persist(GROUP_ENTITY,groupPO);
  }

  $scope.loadGroup = function(){
     $scope.firebaseSelectAll("Groups","name",$scope.group_callback);
  }

  $scope.addGroup_Click = function() {
     $scope.addGroup = !$scope.addGroup;
  };
  
  $scope.saveGroup = function() {
	 var group = {classroom: $scope.group.classroom,code: $scope.group.code, name: $scope.group.name, complete: false, max_member: $scope.group.max_member, active: true};

	 if($scope.netConnection){
        var groupsRef = refFirebase.child("Groups");
        groupsRef.push(group);
		
		$scope.groupVO.push(group);
        persist(GROUP_ENTITY,groupPO);

		$scope.group.classroom  = '';
		$scope.group.code       = '';
	    $scope.group.name       = '';
	    $scope.group.complete   = '';
	    $scope.group.max_member = '';
	    $scope.group.active     = false;
        $scope.addGroup = false;
	} else {
	   alert($scope.i18n.NotSaveGroupOffline);
	}
  };

  $scope.removeGroup = function(item) {
     var result = confirm($scope.i18n.ConfirmGroupRemove);
	 
	 if(!result){
	    return;
	 }
	 
	 if($scope.netConnection){
        var groupRef = refFirebase.child("Groups");
    	groupRef.off('child_added');
        groupRef.orderByChild("code").equalTo(item.code).on('child_added', function (snapshot) {
           var ref = snapshot.ref();
		   ref.remove();
		   
		   var index = $scope.groupVO.indexOf(item);
		   if (index > -1) {
		      $scope.groupVO.splice(index, 1);
			  persist(GROUP_ENTITY,groupPO);
			  $scope.$apply();
		   }
        });
	 } else {
	   alert($scope.i18n.NotRemoveGroupOffline);
	}
  };
  
  $scope.disableGroup = function(item) {
    if(item.active){
        var result = confirm($scope.i18n.ConfirmGroupInactive);
	    
	    if(!result){
	       return;
	    }
	    
	    if($scope.netConnection){
           var groupRef = refFirebase.child("Groups");
       	   groupRef.off('child_added');
           groupRef.orderByChild("code").equalTo(item.code).on('child_added', function (snapshot) {
              var ref = snapshot.ref();
              var data = snapshot.val();
	   	      data.active = false;
	   	   
	   	      ref.update(data);
	   	      
	   	      var index = $scope.groupVO.indexOf(item);
	   	      if (index > -1) {
	   	         //$scope.groupVO.splice(index, 1);
	   	        item.active = false;
	   	        persist(GROUP_ENTITY,groupPO);
	   	        $scope.$apply();
	   	      }
           });
		   
           var usersRef = refFirebase.child("Users");
       	   usersRef.off('child_added');
           usersRef.orderByChild("groupID").equalTo(item.code).on('child_added', function (snapshot) {
              var ref = snapshot.ref();
              var data = snapshot.val();
	   	      data.groupID = -1;
	   	   
	   	      ref.update(data);
           });
		   
	    } else {
	      alert($scope.i18n.NotInactiveGroupOffline);
	   }
	}
  };
  /**********************/

  /**********************/
  /* Activities         */
  $scope.activitieVO  = activitiePO;
  $scope.addActivitie  = false;
  $scope.activitie     = {classroom:'',type:'',code:'',name:'',description:'',optiona:'',optionb:'',optionc:'',optiond:'',algorithm:''};
  
  $scope.activitie_callback = function(x){
	 $scope.activitieVO.splice(0,$scope.activitieVO.length);
     for(var i = 0; i < x.length; i++){
        $scope.activitieVO.push(x[i]);	 
	 }
     persist(ACTIVITIE_ENTITY,activitiePO);
  }

  $scope.loadActivitie = function(){
     if($scope.userVO.role == 1){
        $scope.firebaseSelectAll("Activities","code",$scope.activitie_callback);
	 } else {
        $scope.firebaseSearch("Activities", "classroom", $scope.userVO.classroom, $scope.activitie_callback);
	 }
  }
  
  $scope.addActivitie_Click = function() {
     $scope.addActivitie = !$scope.addActivitie;
  };
  
  $scope.saveActivitie = function() {
	 var activitie = {classroom: $scope.activitie.classroom, type: $scope.activitie.type, code: $scope.activitie.code, name: $scope.activitie.name, description: $scope.activitie.description, optiona:$scope.activitie.optiona, optionb:$scope.activitie.optionb,optionc:$scope.activitie.optionc,optiond:$scope.activitie.optiond,algorithm:$scope.activitie.algorithm};

	 if($scope.netConnection){
        var activitieRef = refFirebase.child("Activities");
        activitieRef.push(activitie);
		
		$scope.activitieVO.push(activitie);
        persist(ACTIVITIE_ENTITY,activitiePO);

		$scope.activitie.classroom   = '';
		$scope.activitie.type        = '';
		$scope.activitie.code        = '';
	    $scope.activitie.name        = '';
	    $scope.activitie.description = '';
        $scope.activitie.optiona     = '';
		$scope.activitie.optionb     = '';
		$scope.activitie.optionc     = '';
		$scope.activitie.optiond     = '';
		$scope.activitie.algorithm   = '';
		$scope.addActivitie = false;
	} else {
	   alert($scope.i18n.NotSaveActivitieOffline);
	}
  };

  $scope.removeActivitie = function(item) {
     var result = confirm($scope.i18n.ConfirmActivitieRemove);
	 
	 if(!result){
	    return;
	 }
	 
	 if($scope.netConnection){
        var activitieRef = refFirebase.child("Activities");
    	activitieRef.off('child_added');
        activitieRef.orderByChild("code").equalTo(item.code).on('child_added', function (snapshot) {
           var ref = snapshot.ref();
		   ref.remove();
		   
		   var index = $scope.activitieVO.indexOf(item);
		   if (index > -1) {
		      $scope.activitieVO.splice(index, 1);
			  persist(ACTIVITIE_ENTITY,activitiePO);
			  $scope.$apply();
		   }
        });
	 } else {
	   alert($scope.i18n.NotRemoveActivitieOffline);
	}
  };

  /**********************/

  /********************/
  /* Activity         */
  
  if (typeof($rootScope.activityToExec) == "undefined" ){
     $rootScope.activityToExec = {classroom:'',type:'',code:'',name:'',description:'',optiona:'',optionb:'',optionc:'',optiond:'',algorithm:''};
  }

  $scope.executeActivity = function(item, monitor) {
     // Limpa a variável do consensus
	 $rootScope.consensusToExec = {};
     //
     $rootScope.activityToExec.classroom   = item.classroom;
     $rootScope.activityToExec.type        = item.type;
     $rootScope.activityToExec.code        = item.code;
     $rootScope.activityToExec.name        = item.name;
     $rootScope.activityToExec.description = item.description;
     $rootScope.activityToExec.optiona     = item.optiona;
     $rootScope.activityToExec.optionb     = item.optionb;
     $rootScope.activityToExec.optionc     = item.optionc;
     $rootScope.activityToExec.optiond     = item.optiond;
     $rootScope.activityToExec.algorithm   = item.algorithm;
	 $rootScope.activityToExec.executeIniTime = new Date().getTime();
	 $rootScope.activityToExec.testCount = 0;
	 
	 alg = item.algorithm;
	 
	 if(monitor){
	   $scope.activityValue = $scope.individualResponse;
	   $scope.activityTestCount = $scope.individualResponseTestCount;
	 } else {
       $scope.activityValue = $scope.getResponse(item);
	 }
	 $scope.activityExecuted = $scope.activityValue != '';
	 $scope.resultTest = '';
	 	 
     $rootScope.backMessage = false;
	 $location.path("/parson");
	 $timeout(expand, 0);
	 
	 if(item.type == 2){
	    $timeout($scope.loadParson, 200);
	 }
  }
  
  $scope.autoExpand = function(e) {
    var objTextArea = typeof e === 'object' ? e.target : document.getElementById(e);
  	//var scrollHeight = element.scrollHeight -0; // replace 60 by the sum of padding-top and padding-bottom
    //element.style.height =  scrollHeight + "px";
    if(objTextArea != null){    
       while (objTextArea.scrollHeight > objTextArea.offsetHeight) {
          objTextArea.rows += 1;
       }
       while (objTextArea.scrollHeight < objTextArea.offsetHeight && objTextArea.rows > 10) {
          objTextArea.rows -= 1;
       }
	   
       objTextArea.rows += 1;
	}
  }
  
  function expand() {
    $scope.autoExpand('solution');
  } 

  $scope.optionClick = function(value){
     if(!$scope.activityExecuted){
	    $scope.activityValue = value;
	 }
  }
  
  $scope.loadParson = function() {
     if($rootScope.activityToExec.type == 2){
        var initial = $scope.activityToExec.algorithm;
	  	
        $rootScope.parson = new ParsonsWidget({
          'sortableId': 'sortable',
	  	  'x_indent': 20,
          'max_wrong_lines': 1,
          'programmingLang': "java",
	  	  'lang': 'ptBR'
        });
        $rootScope.parson.init(initial);
        $rootScope.parson.shuffleLines();
	 
		if($rootScope.backMessage){
		   $rootScope.parson.modified_lines = $rootScope.activityValue;
           var idlist = [];
           for(var i in  $rootScope.parson.modified_lines) {
              idlist.push($rootScope.parson.modified_lines[i].id);
           }
           $rootScope.parson.createHTMLFromLists(idlist,[]);
           for(var i in  $rootScope.parson.modified_lines) {
		      $rootScope.parson.updateHTMLIndent($rootScope.parson.modified_lines[i].id);
           }
		}
	 }
	 
	 return true;
  }

  $scope.loadParsonConsensus = function() {
     if($rootScope.consensusToExec.type == 2){
        var initial = $scope.consensusToExec.algorithm;
	  	
        $rootScope.parson = new ParsonsWidget({
          'sortableId': 'sortable',
	  	  'x_indent': 20,
          'max_wrong_lines': 1,
          'programmingLang': "java",
	  	  'lang': 'ptBR'
        });
        $rootScope.parson.init(initial);
        $rootScope.parson.shuffleLines();
	 
		if($rootScope.backMessage){
		   $rootScope.parson.modified_lines = $rootScope.activityConsensusValue;
           var idlist = [];
           for(var i in  $rootScope.parson.modified_lines) {
              idlist.push($rootScope.parson.modified_lines[i].id);
           }
           $rootScope.parson.createHTMLFromLists(idlist,[]);
           for(var i in  $rootScope.parson.modified_lines) {
		      $rootScope.parson.updateHTMLIndent($rootScope.parson.modified_lines[i].id);
           }
		}
	 }
	 
	 return true;
  }
  
  $scope.parsonTest = function(){
     // Incrementa o contador
     $rootScope.activityToExec.testCount++;
     $scope.resultTest = ''
	 var fb = $rootScope.parson.getFeedback();
	 
	 if(fb.length > 0){
	    $scope.resultTest = fb[0];
	 }
  }

  $scope.goToMessages = function() {
     $rootScope.backMessage = true;
	 
     if($rootScope.activityToExec.type == 1 || $rootScope.activityToExec.type == 3){
	    $rootScope.activityValue = $scope.activityValue;
     } else {
        $rootScope.activityValue = $rootScope.parson.getModifiedCode("#ul-"+$rootScope.parson.options.sortableId);
     }	 
   
     //$scope.msgNotRead = 0;
	 $location.path("/messages");
  }

  $scope.saveResponse = function() {
    var result = confirm($scope.i18n.ConfirmSaveResponse);
	 
	if(!result){
	   return;
	}

	if($rootScope.activityToExec.type == 2){
	   var value = $rootScope.parson.getModifiedCode("#ul-"+$rootScope.parson.options.sortableId);
	   var alg = "";
	   
	   for(i in value){
	      if(value[i] != null){
		     for(var x=0; x < value[i].indent; x++){
			    alg = alg + ' ';
			 }
			 
			 alg = alg + value[i].code;
			 alg = alg + '\n';
		  }
	   }
	   
	   $scope.activityValue = alg;
	}
	var now = new Date().getTime();
	// Calcula o tempo para execução da atividade
	var executeTime = (now - $rootScope.activityToExec.executeIniTime) / 1000;
	
	var response = {classroom: $rootScope.activityToExec.classroom, code: $rootScope.activityToExec.code, group: $scope.userVO.groupID, email: $scope.userVO.email, response: $scope.activityValue, send: false, execTime: executeTime, testCount: $rootScope.activityToExec.testCount};
  	
	if(!$scope.isExecuted(response)){
	   responsePO.push(response);
	   persist(INDIVIDUAL_RESPONSE_ENTITY,responsePO);
	}
   
    $location.path("/menu");
  }
  
  $scope.isExecuted = function(item) {
     for(i in responsePO){
	    if(item.classroom == responsePO[i].classroom && item.code == responsePO[i].code){
		   return true;
		}
	 }
	 
	 return false;
  }

  $scope.getResponse = function(item) {
     for(i in responsePO){
	    if(item.classroom == responsePO[i].classroom && item.code == responsePO[i].code){
		   return responsePO[i].response;
		}
	 }
	 
	 return '';
  }

  $scope.sendToServer = function() {
     for(i in responsePO){
	    if(responsePO[i].send == false){
	       if($scope.netConnection){
              var response = {};
              response.classroom = responsePO[i].classroom;
			  response.code      = responsePO[i].code;
			  response.group     = responsePO[i].group;
			  response.email     = responsePO[i].email;
			  response.response  = responsePO[i].response;
			  response.execTime  = responsePO[i].execTime;
			  response.testCount = responsePO[i].testCount;
			  
			  var responseRef = refFirebase.child("Individual_Response");
              responseRef.push(response);
		
		      responsePO[i].send = true;
	          persist(INDIVIDUAL_RESPONSE_ENTITY,responsePO);
		   }
		}
	 }
  }
  
  /********************/
  
  /**********************/
  /* Material           */
  $scope.materialVO  = materialPO;
  $scope.addMaterial = false;
  $scope.material    = {classroom:'',code:'',title:'',url:''};
  
  $scope.material_callback = function(x){
	 $scope.materialVO.splice(0,$scope.materialVO.length);
     for(var i = 0; i < x.length; i++){
        $scope.materialVO.push(x[i]);	 
	 }
     persist(MATERIAL_ENTITY,materialPO);
  }

  $scope.loadMaterial = function(){
     if($scope.userVO.role == 1){
        $scope.firebaseSelectAll("Material","code",$scope.material_callback);
	 } else {
        $scope.firebaseSearch("Material", "classroom", $scope.userVO.classroom, $scope.material_callback);
	 }
  }
  
  $scope.addMaterial_Click = function() {
     $scope.addMaterial = !$scope.addMaterial;
  };
  
  $scope.saveMaterial = function() {
	 var material = {classroom: $scope.material.classroom, code: $scope.material.code, title: $scope.material.title, url: $scope.material.url};

	 if($scope.netConnection){
        var materialRef = refFirebase.child("Material");
        materialRef.push(material);
		
		$scope.materialVO.push(material);
        persist(MATERIAL_ENTITY,materialPO);

		$scope.material.classroom  = '';
		$scope.material.code  = '';
	    $scope.material.title = '';
	    $scope.material.url   = '';
        $scope.addMaterial = false;
	} else {
	   alert($scope.i18n.NotSaveMaterialOffline);
	}
  };

  $scope.removeMaterial = function(item) {
     var result = confirm($scope.i18n.ConfirmMaterialRemove);
	 
	 if(!result){
	    return;
	 }
	 
	 if($scope.netConnection){
        var materialRef = refFirebase.child("Material");
    	materialRef.off('child_added');
        materialRef.orderByChild("code").equalTo(item.code).on('child_added', function (snapshot) {
           var ref = snapshot.ref();
		   ref.remove();
		   
		   var index = $scope.materialVO.indexOf(item);
		   if (index > -1) {
		      $scope.materialVO.splice(index, 1);
			  persist(MATERIAL_ENTITY,materialPO);
			  $scope.$apply();
		   }
        });
	 } else {
	   alert($scope.i18n.NotRemoveMaterialOffline);
	}
  };
  
  $scope.openLink = function(url) {
     if(typeof(mosync) != 'undefined'){
 	    mosync.app.openExternalURL(url);
     } else {
	    var win = window.open(url, '_blank');
        win.focus();
	 }
  }
  /**********************/

  /***************************/
  /* Meu Grupo               */
  /***************************/
  $scope.groups = [];
  $scope.userGroups = [];
  
  $scope.getGroups = function(){
	 if($scope.userVO.groupID == '-1'){
        $scope.loadGroupsForClass($scope.userVO.classroom);
	 }
  }

  $scope.groupClass_callback = function(x){
	 $scope.groups = [];
     for(var i = 0; i < x.length; i++){
	    if(x[i].active){
           $scope.groups.push(x[i]);
		}
	 }
	 
     $scope.loadUsersForGroup();
  }

  $scope.loadGroupsForClass = function(classroom){
     $scope.firebaseSearch("Groups","classroom",classroom,$scope.groupClass_callback);
  }
  
  $scope.userGroup_callback = function(x){
     if(isArray(x) && x.length > 0){
   	    $scope.userGroups[x[0].groupID] = x;
	 }  
  }
  
  $scope.loadUsersForGroup = function(){
	 $scope.userGroups = [];
     for(i in $scope.groups){
        $scope.firebaseSearch("Users","groupID",$scope.groups[i].code,$scope.userGroup_callback);
	 }
  }
  
  $scope.groupEnter = function(group){
     var result = confirm($scope.i18n.ConfirmEnterGroup);

	 if(result){
        var userRef = refFirebase.child("Users");
    	userRef.off('child_added');
        userRef.orderByChild("email").equalTo($scope.userVO.email).on('child_added', function (snapshot) {
           var ref = snapshot.ref();
		   ref.update({groupID:group.code},function(error){
                                              if (error) {
                                                 alert('Error on update user data.');
                                              } else {
                                                 userPO.groupID = group.code;
	                                             persist(USER_ENTITY,userPO);
												 $scope.completeGroup(group.code);
												 $scope.userVO.groupID = group.code;
												 $route.reload();
                                              }});
        });
	 }
  }  

  $scope.usersOnGroup_callback = function(x){
     if(isArray(x)){
	    //if(x.length >= $scope.userGroups[x[0].groupID].length){
           var groupRef = refFirebase.child("Groups");
    	   groupRef.off('child_added');
           groupRef.orderByChild("code").equalTo(x[0].groupID).on('child_added', function (snapshot) {
		      var val = snapshot.val();
			  if(val.max_member <= x.length){
                 var ref = snapshot.ref();
		         ref.update({complete:true},function(error){
                                                    if (error) {
                                                       alert('Error on update group data.');
                                                    }});
			  }
           });
        //}		
	 }
  }
  
  $scope.completeGroup = function(code){
     $scope.firebaseSearch("Users","groupID",code,$scope.usersOnGroup_callback);
  }
  
  $scope.loadMyGroupInfo = function(){
     $scope.myGroupInfo = {};
	 if($scope.userVO.groupID != '-1'){
        $scope.firebaseSearch("Groups","code",$scope.userVO.groupID,$scope.groupInfo_callback);
	 }
  }
  
  $scope.groupInfo_callback = function(x){
    if(isArray(x)){
       $scope.myGroupInfo.groupName = x[0].name;
	   $scope.loadUsersMyGroup();
	}
  }
  
  $scope.loadUsersMyGroup = function(){
	 $scope.myGroupInfo.users = [];
	 $scope.myGroupInfo.userStatus = [];
	 $scope.myGroupInfo.userActivities = [];
     $scope.firebaseSearch("Users","groupID",$scope.userVO.groupID,$scope.usersMyGroup_callback);
     $scope.firebaseSelectAll("User_Status","email",$scope.usersStatus_callback);
     $scope.firebaseSelectAll("Individual_Response","email",$scope.usersResponse_callback);
  }
  
  $scope.usersMyGroup_callback = function(x){
     if(isArray(x)){
	    $scope.myGroupInfo.users = x;
	 }
  }
  
  $scope.usersStatus_callback = function(x){
     if(isArray(x)){
	    $scope.myGroupInfo.userStatus = x;
	 }
  }

  $scope.usersResponse_callback = function(x){
     if(isArray(x)){
	    $scope.myGroupInfo.userActivities = x;
	 }
  }

  $scope.getActivities = function(email){
     var result = ''; 
	 
     for(i in $scope.myGroupInfo.userActivities){
	    if($scope.myGroupInfo.userActivities[i].email == email){
		   result = result + '<li>' + $scope.getActivitieName($scope.myGroupInfo.userActivities[i].code) + '</li>';
		}
	 }
  
     if(result != ''){
	    result = '<ul>' + result + '</ul>';
	 }
	 
	 return result;
  }
 
  $scope.getActivitieName = function(code){
     for(i in $scope.activitieVO){
	    if($scope.activitieVO[i].code == code){
		   return $scope.activitieVO[i].name;
		}
	 }
	 
	 return '';
  }
  
  // Retorna se um usuário está Online
  $scope.isOnline = function(email){
     for(i in $scope.myGroupInfo.userStatus){
	    if($scope.myGroupInfo.userStatus[i].email == email){
		   now = (new Date()).getTime();
		   
		   if(now - $scope.myGroupInfo.userStatus[i].pulse < 120000){
		      return true;
		   }
		   
		   return false;
		}
	 }
  
     return false;
  }
  
  // Retorna quando o usuário leu as mensagens
  $scope.lastReadMsg = function(email){
     for(i in $scope.myGroupInfo.userStatus){
	    if($scope.myGroupInfo.userStatus[i].email == email){
		   return $scope.myGroupInfo.userStatus[i].msg_read;
		}
	 }
  
     return '';
  }
  /***************************/

  /***************************/
  /* Pulse                   */
  /***************************/
  $scope.initPulse = function(){
     $timeout(function(){
	             $scope.pulse();
				 $scope.initPulse();
			  },60000);
  }
  
  $scope.pulse = function(){
     $scope.sendPulse = true;
     $scope.sendMsgRead = false;
     $scope.firebaseSearch("User_Status","email",$scope.userVO.email,$scope.userStatus_callback);
  }
  
  $scope.userStatus_callback = function(x){
     if(isArray(x) && x.length > 0){
	    $scope.updateStatus($scope.sendPulse,$scope.sendMsgRead);
	 } else {
	    $scope.addStatus($scope.sendPulse,$scope.sendMsgRead);
	 }
  }

  $scope.updateStatus = function(pulse, msg_read){
     var userStatusRef = refFirebase.child("User_Status");
     userStatusRef.off('child_added');
     userStatusRef.orderByChild("email").equalTo($scope.userVO.email).on('child_added', function (snapshot) {
       var ref = snapshot.ref();
	   var now_time = (new Date()).getTime();
	   var status = {};
	   
	   if(pulse){
	      status.pulse = now_time;
	   }

	   if(msg_read){
	      status.msg_read = now_time;
	   }
	   
	   ref.update(status,function(error){
                            if (error) {
                                 alert('Error on update data.');
                            }});
     });
  }

  $scope.addStatus = function(pulse, msg_read){
     var now_time = (new Date()).getTime();
	 var status = {email: $scope.userVO.email}
	 
	 if(pulse){
	    status.pulse = now_time;
	 }

	 if(msg_read){
	    status.msg_read = now_time;
	 }

     var userStatusRef = refFirebase.child("User_Status");
     userStatusRef.push(status);
  }
  /***************************/
  
  /***************************/
  /* Consensus               */
  /***************************/
  $scope.initConsensus = function(){
     //{classroom:'',code:'',execTime:'',group:'',response:'',testCount:''}
     //{classroom:'',code:'',group:'',email:''}
	 $scope.groupResponse = [];
	 $scope.confirmConsensus = [];
     $scope.firebaseSearch("Group_Response","group",$scope.userVO.groupID,$scope.groupResponse_callback);
     $scope.firebaseSearch("Confirm_Consensus","group",$scope.userVO.groupID,$scope.confirmConsensus_callback);
  }
  
  $scope.groupResponse_callback = function(x){
     if(isArray(x) && x.length > 0){
	    for(i in x){
		   $scope.groupResponse[x[i].code] = x[i];
		}
	 }
  }
  
  $scope.confirmConsensus_callback = function(x){
     if(isArray(x) && x.length > 0){
	    for(i in x){
		   if(x[i].email == $scope.userVO.email){
		      $scope.confirmConsensus[x[i].code] = x[i];
		   }
		}
	 }
  }

  if (typeof($rootScope.consensusToExec) == "undefined" ){
     $rootScope.consensusToExec = {classroom:'',type:'',code:'',name:'',description:'',optiona:'',optionb:'',optionc:'',optiond:'',algorithm:''};
  }
  
  $scope.executeConsensusActivity = function(item, monitor) {
     // Limpa a variável do activity
	 $rootScope.activityToExec = {};
	 //
     $rootScope.consensusToExec.classroom   = item.classroom;
     $rootScope.consensusToExec.type        = item.type;
     $rootScope.consensusToExec.code        = item.code;
     $rootScope.consensusToExec.name        = item.name;
     $rootScope.consensusToExec.description = item.description;
     $rootScope.consensusToExec.optiona     = item.optiona;
     $rootScope.consensusToExec.optionb     = item.optionb;
     $rootScope.consensusToExec.optionc     = item.optionc;
     $rootScope.consensusToExec.optiond     = item.optiond;
     $rootScope.consensusToExec.algorithm   = item.algorithm;
	 $rootScope.consensusToExec.executeIniTime = new Date().getTime();
	 $rootScope.consensusToExec.testCount = 0;
	 
	 alg = item.algorithm;

	 if(monitor){
	   $scope.activityConsensusValue = $scope.groupResponseMonitor;
	   $scope.activityTestCount = $scope.groupResponseTestCount;
	   $scope.activityConsensusExecuted = true;
	   $scope.activityConsensusConfirmed = true;
	 } else {
       $scope.activityConsensusValue = $scope.getConsensusResponse(item);
	   $scope.activityConsensusExecuted = $scope.isConsensusExecuted(item);
	   $scope.activityConsensusConfirmed = $scope.isConsensusConfirmed(item);
	 }
	 
	 $scope.resultConsensusTest = '';
	 	 
     $rootScope.backMessage = false;
	 $location.path("/activityConsensus");
	 $timeout(expand, 0);
	 
	 if(item.type == 2){
	    $timeout($scope.loadParsonConsensus, 200);
	 }
  }
  
  $scope.saveGroupResponse = function(){
    var result = confirm($scope.i18n.ConfirmSaveResponse);
	 
	if(!result){
	   return;
	}

	if($rootScope.consensusToExec.type == 2){
	   var value = $rootScope.parson.getModifiedCode("#ul-"+$rootScope.parson.options.sortableId);
	   var alg = "";
	   
	   for(i in value){
	      if(value[i] != null){
		     for(var x=0; x < value[i].indent; x++){
			    alg = alg + ' ';
			 }
			 
			 alg = alg + value[i].code;
			 alg = alg + '\n';
		  }
	   }
	   
	   $scope.activityConsensusValue = alg;
	}
	var now = new Date().getTime();
	// Calcula o tempo para execução da atividade
	var executeTime = (now - $rootScope.consensusToExec.executeIniTime) / 1000;
	
	var response = {classroom: $rootScope.consensusToExec.classroom, code: $rootScope.consensusToExec.code, group: $scope.userVO.groupID, response: $scope.activityConsensusValue, execTime: executeTime, testCount: $rootScope.consensusToExec.testCount};
    var confirmConsensus  = {classroom: $rootScope.consensusToExec.classroom, code: $rootScope.consensusToExec.code ,group: $scope.userVO.groupID, email:$scope.userVO.email};
    
	var responseRef = refFirebase.child("Group_Response");
    responseRef.push(response);
	
    var confirmRef = refFirebase.child("Confirm_Consensus");
    confirmRef.push(confirmConsensus);
	

     //{classroom:'',code:'',execTime:'',group:'',response:'',testCount:''}
     //{classroom:'',code:'',group:'',email:''}
	 $scope.groupResponse[$rootScope.consensusToExec.code] = response;
	 $scope.confirmConsensus[$rootScope.consensusToExec.code] = confirmConsensus;
	 
    $location.path("/consensus");
  }

  $scope.parsonTestConsensus = function(){
     // Incrementa o contador
     $rootScope.consensusToExec.testCount++;
     $scope.resultTestConsensus = ''
	 var fb = $rootScope.parson.getFeedback();
	 
	 if(fb.length > 0){
	    $scope.resultTestConsensus = fb[0];
	 }
  }
  
  $scope.getConsensusResponse = function(item) {
     var result = $scope.groupResponse[item.code];
	 if(typeof(result) != 'undefined'){
	   return result.response;
	 }
	 
	 return '';
  }

  $scope.noConfirmConsensus = function(){
    var confirmRef = refFirebase.child("Confirm_Consensus");
    confirmRef.off('child_added');
    confirmRef.orderByChild("code").equalTo($rootScope.consensusToExec.code).on('child_added', function (snapshot) {
	   var data = snapshot.val();
	   if(data.classroom == $rootScope.consensusToExec.classroom && data.group == $scope.userVO.groupID){
          var ref = snapshot.ref();
	      ref.remove();
	   }
    });
	
	$timeout(function(){
                var ref = refFirebase.child("Confirm_Consensus");
                ref.off('child_added');
	         },5000);
	
    var groupResponseRef = refFirebase.child("Group_Response");
    groupResponseRef.off('child_added');
    groupResponseRef.orderByChild("code").equalTo($rootScope.consensusToExec.code).on('child_added', function (snapshot) {
	   var data = snapshot.val();
	   if(data.classroom == $rootScope.consensusToExec.classroom && data.group == $scope.userVO.groupID){
          var ref = snapshot.ref();
	      ref.remove();
	   }
    });
	 
	$timeout(function(){
                var ref = refFirebase.child("Group_Response");
                ref.off('child_added');
	         },5000);
			 
    $location.path("/consensus");
  }
 
  $scope.confirmConsensus = function(){
    var confirmConsensus  = {classroom: $rootScope.consensusToExec.classroom, code: $rootScope.consensusToExec.code ,group: $scope.userVO.groupID, email:$scope.userVO.email};
    var confirmRef = refFirebase.child("Confirm_Consensus");
    confirmRef.push(confirmConsensus);
	
	$scope.confirmConsensus[$rootScope.consensusToExec.code] = confirmConsensus;
	 
    $location.path("/consensus");
  }
  
  $scope.isConsensusExecuted = function(item) {
     var result = $scope.groupResponse[item.code];
	 if(typeof(result) != 'undefined'){
 		return true;
	 }
	 
	 return false;
  }

  $scope.isConsensusConfirmed = function(item) {
     var result = $scope.confirmConsensus[item.code];
	 if(typeof(result) != 'undefined'){
 		return true;
	 }
	 
	 return false;
  }

  $scope.goToMessagesFromConsensus = function() {
     $rootScope.backMessage = true;
	 
     if($rootScope.consensusToExec.type == 1 || $rootScope.consensusToExec.type == 3){
	    $rootScope.activityConsensusValue = $scope.activityConsensusValue;
     } else {
        $rootScope.activityConsensusValue = $rootScope.parson.getModifiedCode("#ul-"+$rootScope.parson.options.sortableId);
     }	 
   
     //$scope.msgNotRead = 0;
	 $location.path("/messages");
  }
  
  /***************************/

  /***************************/
  /* Monitor                 */
  /***************************/
  
  $scope.individualresponse_callback = function(x){
     if(isArray(x)){
	    $scope.individualResponses = x;
	 }
  }
  
  $scope.monitorconsensus_callback = function(x){
     if(isArray(x)){
	    $scope.groupConsensus = x;
	 }
  }

  $scope.groupresponsemonitor_callback = function(x){
     if(isArray(x)){
	    $scope.groupResponses = x;
	 }
  }
  
  $scope.loadInfo = function(){
     $scope.classGroups = [];
	 $scope.individualResponses = [];
	 $scope.groupResponses = [];
	 $scope.groupConsensus = [];
	 $scope.activitiesClass = $scope.activitiesFromClass($scope.userVO.classroom);
	 
     $scope.firebaseSearch("Individual_Response","classroom",$scope.userVO.classroom,$scope.individualresponse_callback);
     $scope.firebaseSearch("Confirm_Consensus","classroom",$scope.userVO.classroom,$scope.monitorconsensus_callback);
     $scope.firebaseSearch("Group_Response","classroom",$scope.userVO.classroom,$scope.groupresponsemonitor_callback);
	 
	 
	 for(i in $scope.groupVO){
	    if($scope.groupVO[i].classroom == $scope.userVO.classroom && $scope.groupVO[i].active){
		   $scope.classGroups.push($scope.groupVO[i]);
		}
	 }
  }

  $scope.activitiesFromClass = function(classroom){
     var activityList = [];
	 
	 for(i in $scope.activitieVO){
	    if($scope.activitieVO[i].classroom == classroom){
		   activityList.push($scope.activitieVO[i]);
		}
	 }
	 
	 return activityList;
  }

  $scope.studentsFromGroup = function(groupID){
     var studentList = [];
	 
	 for(i in $scope.studentVO){
	    if($scope.studentVO[i].groupID == groupID){
		   studentList.push($scope.studentVO[i]);
		}
	 }
	 
	 return studentList;
  }
  
  $scope.hasResponse = function(activity,email){
     for(i in $scope.individualResponses){
	    if($scope.individualResponses[i].code == activity && $scope.individualResponses[i].email == email){
		   return true;
		}
	 }
	 
	 return false;
  }
  
  $scope.hasConsensus = function(activity,email){
     for(i in $scope.groupConsensus){
	    if($scope.groupConsensus[i].code == activity && $scope.groupConsensus[i].email == email){
		   return true;
		}
	 }
	 
	 return false;
  }
  
  $scope.showConsensusResponse = function(activity, group){
    $scope.groupResponseMonitor = "";
    $scope.groupResponseTestCount = 0;
	
    for(i in $scope.groupResponses){
	  if($scope.groupResponses[i].code == activity.code && $scope.groupResponses[i].group == group){
	    $scope.groupResponseMonitor = $scope.groupResponses[i].response;
	    $scope.groupResponseTestCount = $scope.groupResponses[i].testCount;
		break;
	  }
	}
	
	$scope.executeConsensusActivity(activity, true);
  }

  $scope.showIndividualResponse = function(activity, email){
    $scope.individualResponse = "";
    $scope.individualResponseTestCount = 0;
	
    for(i in $scope.individualResponses){
	  if($scope.individualResponses[i].code == activity.code && $scope.individualResponses[i].email == email){
	    $scope.individualResponse = $scope.individualResponses[i].response;
	    $scope.individualResponseTestCount = $scope.individualResponses[i].testCount;
		break;
	  }
	}
	
	$scope.executeActivity(activity, true);
  }
 
  /***************************/

  /***************************/
  /* Método de inicialização */
  /***************************/
  $scope.initialize = function(){
   	 // Inicia o sistema de mensagem
	 $scope.initMessageListner();

     $scope.loadActivitie();
     $scope.loadClass();
     $scope.loadStudent();
     $scope.loadGroup();
     $scope.loadMaterial();
	 
	 $scope.initPulse();
  }
});
