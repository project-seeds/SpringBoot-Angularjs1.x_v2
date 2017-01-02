
-- password Aa123456
merge into users (username, password, enabled, role, created_by, created_date, modified_by, modified_date) 
	key (username)  
	values
		('admin', '$2a$10$fmB9/MThUJIjBmXd4cjWc.7le.mZNdnYSeiZp9btAhF3HLl4vPC56', 1, 'ROLE_ADMIN', -1, CURRENT_TIMESTAMP(), -1, CURRENT_TIMESTAMP());
