<?php

do_action( 'bp_before_experiment_header' );

?>

<style>
.exp-admins{
background-color:#0b758e;
}
.exp-admins h3{
margin:0px;
}
.exp-admins ul li a img{
border-radius:4px;
}
#item-nav div ul li a{
font-size:1.5em!important;
padding: 10px 20px !important;
}
#item-nav div ul li a:hover{
	background-color: white!important;
	color:#0ea2d1!important;
	font-size:1.5em!important;
}
#item-nav {
	bottom:0px !important;
}

#item-nav div ul .current a{
	background-color: white!important;
	color:#0ea2d1!important;
	font-size:1.5em!important;
}

</style>
<div id='experiment-title'><?php bp_experiment_name(); ?></div>

<div class='row'>

	<div class='col-lg-3 col-md-3 col-sm-12 col-xs-12 side pull-right'>
		<div id="item-header-avatar">
			<img class='exp-avatar' src='<?php bp_experiment_avatar(); ?>'/>
			<?php do_action( 'bp_experiment_header_actions' ); ?>

		</div><!-- #item-header-avatar -->
	</div>
	<div class='col-lg-9 col-md-9 col-sm-12 col-xs-12 main pull-left'>
		<div id="item-header-content">

			<?php do_action( 'bp_before_experiment_header_meta' ); ?>

			<div id="exp-desc">

				<?php bp_experiment_description(); ?>

			

				<?php do_action( 'bp_experiment_header_meta' ); ?>
				<div class='row'>
					<div class='col-md-12' id="item-actions">

						<?php if ( bp_experiment_is_visible() ) : ?>
						 <div class="well-sm exp-admins" >
							<h3><?php _e( 'Experiment Admins', 'buddypress' ); ?></h3>

							<?php bp_experiment_list_admins();

							do_action( 'bp_after_experiment_menu_admins' );

							if ( bp_experiment_has_moderators() ) :
								do_action( 'bp_before_experiment_menu_mods' ); ?>

								<h3><?php _e( 'Experiment Mods' , 'buddypress' ); ?></h3>

								<?php bp_experiment_list_mods();

								do_action( 'bp_after_experiment_menu_mods' );

							endif;
							echo '</div>';
						endif; ?>

					</div><!-- #item-actions -->
					</div>
					<span class="highlight"><?php bp_experiment_type(); ?></span>
			<span class="activity"><?php printf( __( 'active %s', 'buddypress' ), bp_get_experiment_last_active() ); ?></span>
			</div>
			
		</div><!-- #item-header-content -->
	</div>

	
</div>
<div id="item-nav" style="max-width:1200px; margin:0 auto;">
				<div class="item-list-tabs no-ajax" id="object-nav" role="navigation">
					<ul>
						<?php bp_get_options_nav(); ?>
						<?php do_action( 'bp_experiment_options_nav' ); ?>
					</ul>
				</div>
			</div>
		<!-- #item-nav -->

<?php
do_action( 'bp_after_experiment_header' );
do_action( 'template_notices' );
?>