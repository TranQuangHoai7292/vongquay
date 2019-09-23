<?php
error_reporting(0);
$json = file_get_contents('ds-data.txt');
$json = explode("||", $json);
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Danh sách đăng ký</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<!-- 	<script type="text/javascript">
		var password;
		var pass1="12345678";
		password=prompt('Vui lòng nhập mật khẩu',''); 
		if (password==pass1)
			alert('Mật khẩu chính xác, bấm OK để xem dữ liệu.'); 
		else {
			alert('Mật khẩu sai! Bạn sẽ được chuyển về trang chủ.');
			window.location="/"; 
		}
	</script> -->
	<script src="//code.jquery.com/jquery-1.12.4.js"></script>
	<script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
	<script src="https://cdn.datatables.net/1.10.16/js/dataTables.bootstrap.min.js"></script>
	<script src="https://cdn.datatables.net/buttons/1.4.2/js/dataTables.buttons.min.js"></script>
	<script src="https://cdn.datatables.net/buttons/1.4.2/js/buttons.bootstrap.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/pdfmake.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/vfs_fonts.js"></script>
	<script src="//cdn.datatables.net/buttons/1.4.2/js/buttons.html5.min.js"></script>
	<script src="//cdn.datatables.net/buttons/1.4.2/js/buttons.print.min.js"></script>
	<script src="//cdn.datatables.net/buttons/1.4.2/js/buttons.colVis.min.js"></script>
	<link rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/dataTables.bootstrap.min.css">
	<link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.4.2/css/buttons.bootstrap.min.css">
	<script type="text/javascript">
		$(document).ready(function() {
			var table = $('#example').DataTable( {
				lengthChange: false,
				buttons: [ 'copy', 'excel', 'pdf', 'colvis' ],
				"order": [[ 0, "desc" ]],
				"pageLength":200
			} );
			table.buttons().container()
			.appendTo( '#example_wrapper .col-sm-6:eq(0)' );
		});
	</script>
</head>
<body>
	<div class="container">
		<h2>Danh sách đăng ký</h2>
		<table id="example" class="table table-striped table-bordered">
			<thead>
				<tr>
					<th>STT</th>
					<!-- <th>Địa chỉ IP</th> -->
					<th>Thời gian</th>
					<th>Thiết bị</th>
					<!-- <th>Nguồn UTM</th> -->
					<!-- <th>Hành động</th> -->
					<th>CMND</th>
					<th>Tên</th>
					<th>Điện thoại</th>
					<th>Email</th>
					<th>Giải thưởng</th>
				</tr>
			</thead>
			<tbody>
				<?php
				if(empty($json[0])){
					echo '<tr><td colspan="6">Chưa có ai đăng kí</td></tr>';
				}else{
					$i=1;
					foreach ($json as $j) {
						$j = (array)json_decode($j);
						$jj = [];
						if(!empty($j['json_data'])){
							$jArray = json_decode($j['json_data']);
							foreach ($jArray as $jA) {
								if($jA->name != 'mail-to' && $jA->name != 'subject'){
									$jj[$jA->name] = $jA->value;
								}
							}
						}
						if(!empty($j)){
							echo '<tr>';
							echo '<td>'.$i++.'</td>';
							// echo '<td>'.$j['ip'].'</td>';
							echo '<td>'.$j['time'].'</td>';
							echo '<td>'.$j['device'].'</td>';
							// echo '<td>'.$j['utm'].'</td>';
							// echo '<td>'.$j['action'].'</td>';
							echo '<td>'.$jj['CMND'].'</td>';
							echo '<td>'.$jj['Tên của bạn'].'</td>';
							echo '<td>'.$jj['Điện thoại'].'</td>';
							echo '<td>'.$jj['Email'].'</td>';
							echo ($jj['Giải thưởng']=='May mắn lần sau')?'<td>Đăng ký thành công</td>':'<td>'.$jj['Giải thưởng'].'</td>';
							echo '</tr>';
						}
					}
				}
				?>
			</tbody>
		</table>
	</div>
</body>
</html>
