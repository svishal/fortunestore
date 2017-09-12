     <header class="main-header">
    <!-- Logo -->
    <a href="#" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>Fortune</b>store</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>Fortune store</b></span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="{{Auth::user()->image_url}}" class="user-image" alt="User Image">
              <span class="hidden-xs">{{ucwords(Auth::user()->name)}}</span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image 
              <li class="user-header">
                <img src="{{Auth::user()->image_url}}" class="img-circle" alt="User Image">

                <p>
                  {{ucwords(Auth::user()->name)}}
                </p>
              </li>-->
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-right">
                  <a href="#" class="btn btn-default btn-flat"  data-toggle="modal" data-target="#edit_admin">Edit Profile</a>
                  <a href="/logout" class="btn btn-default btn-flat">Sign out</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu" data-widget="tree">
        <li class="header">MAIN NAVIGATION</li>
        <li><a href="/dashboard"><span>All Customer List</span></a></li>
         <li><a href="/fos_list"><span>FOS (Feet on Street)</span></a></li>
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>

  <!-- Modal -->
<div class="modal fade" id="edit_admin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Edit Profile</h4>
      </div>
      <form id="update_settings_form" action="/update_settings" method="post">
       {{ csrf_field() }}
      <div class="modal-body">
              <div class="box-body">
                 @if (Session::has('save_message'))
                <div class="alert alert-info">{{ Session::get('save_message') }}</div>
                @endif
                <div class="form-group">
                  <label for="date_of_joining" class="col-sm-3 control-label">User Name</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control" name="name" id="name" value="{{Auth::user()->name}}">
                  </div>
                </div>
                <div class="form-group">
                  <label for="date_of_joining" class="col-sm-3 control-label">Email Id</label>
                  <div class="col-sm-9">
                    <input type="email" class="form-control" name="email" placeholder="Email" value="{{Auth::user()->email}}" readonly="readonly">
                  </div>
                </div>
                <div class="form-group">
                  <label for="date_of_joining" class="col-sm-3 control-label">Password</label>
                  <div class="col-sm-9">
                    <input type="password" name="password" id="password" class="form-control" placeholder="Password">
                  </div>
                </div>
                <div class="form-group">
                  <label for="date_of_joining" class="col-sm-3 control-label">Confirm Password</label>
                  <div class="col-sm-9">
                    <input type="password" class="form-control" id="confirm_password" placeholder="Confirm password">
                  </div>
                </div>
              </div>
              <!-- /.box-footer -->
            
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <button type="submit" id="update_settings" class="btn btn-primary">Update</button>
      </div>
      </form>
    </div>
  </div>
</div>