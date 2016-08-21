drop database if exists aliyun;
create database aliyun character set utf8;
use aliyun;

-- �û���
CREATE TABLE `CLOUD_USER` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `CLOUD_USER` VALUES ('1', 'admin', 'admin');
commit;

-- ���˺����ñ�
CREATE TABLE `CLOUD_ACCOUNT` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '���',
  `account_name` varchar(50) NOT NULL COMMENT '�ʺ�����',
  `type_id` int(1) NOT NULL COMMENT '������ID 0-aliyun 1-openstack',
  `vm_count` int(11) NOT NULL COMMENT '�������',
  `status` int(1) NOT NULL COMMENT '�ʺ�״̬ 0-��Ч��1-��Ч',
  `sync_status` int(1) NOT NULL COMMENT 'ͬ��״̬ 0-ʧ�� 1-�ɹ�',
  `update_time` datetime DEFAULT NULL COMMENT '�ϴ�ͬ��ʱ��',
  `create_time` datetime NOT NULL COMMENT '����ʱ��',
  `mark` varchar(200) DEFAULT NULL COMMENT '��ע',
  `tenantName` varchar(200) DEFAULT NULL,
  `username` varchar(200) DEFAULT NULL COMMENT '�����ƶ�ӦAccess Key ID',
  `password` varchar(200) DEFAULT NULL COMMENT '�����ƶ�ӦAccess Key Secret',
  `endpoint` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;


-- �����ģ���һ��|���
create table CLOUD_TEMPLATE
(
   ID                   int(11) not null AUTO_INCREMENT,
   TEM_NAME             varchar(60) comment 'ģ������',
   TEM_DESC             varchar(100) comment 'ģ������',
   `platform_type`      int(1) COMMENT '��ƽ̨���ͣ�0��ʾ�����ƣ�1��ʾopenstack',
   ACCOUNTID            int(11) comment '���˺�id',
   TEM_STATUS           tinyint comment 'ģ��״̬:0��Ч��1��Ч',
   CREATETIME           datetime comment '����ʱ��',
   TEM_CONTEXT          varchar(2000) comment 'ģ������',
   primary key (ID)
);
alter table CLOUD_TEMPLATE comment 'ģ���';


-- ��Ⱥ��
CREATE TABLE `CLOUD_CLUSTER` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '��Ⱥ���',
  `cluster_name` varchar(200) NOT NULL,
  `env_type` int(1) NOT NULL COMMENT '0 ����������1 ���Ի����� 2 staging���� 3 ��������',
  `descr` varchar(1000) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ��������
CREATE TABLE `CLOUD_VM_GROUP` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(200) NOT NULL,
  `cluster_id` int(11) NOT NULL,
  `descr` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- �������
CREATE TABLE `CLOUD_VIRTUAL` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '��ʶid',
  `account_id`   int(11) DEFAULT NULL COMMENT '���˺ű�����id',
  `platform_type`      int(1) COMMENT '��ƽ̨���ͣ�0��ʾ�����ƣ�1��ʾopenstack',
  `virtual_name` varchar(60) NOT NULL COMMENT '���������',
  `virtual_id` varchar(60) NOT NULL COMMENT '�����id',
  `image_id` varchar(60) NOT NULL COMMENT '����id',
  `cluster_id`   int(11) DEFAULT NULL COMMENT '��Ⱥid',
  `vm_group_id`  int(11) DEFAULT NULL COMMENT '�������id',
  `status` varchar(20) DEFAULT NULL COMMENT '�����״̬',
  `ipaddresses` varchar(255) DEFAULT NULL COMMENT '������ö��ŷָ���������������������',
  `regionid` varchar(60) DEFAULT NULL COMMENT 'ʵ����������ID',
  `virtual_size` varchar(20) DEFAULT NULL COMMENT '�������С',
  `virtual_sys` varchar(60) DEFAULT NULL COMMENT '���������ϵͳ',
  `virtual_createtime` datetime DEFAULT NULL COMMENT '���������ʱ��',
  `virtual_synchrotime` datetime DEFAULT NULL COMMENT '�����ͬ������ʱ��',
  `target` char(1) DEFAULT 0 NOT NULL COMMENT '��ƽ̨���ͣ�0��ʾδ���룬1��ʾ���룬2��ʾ���� 3��ʷ',
  `deleteFlag` char(1) DEFAULT 1  NOT NULL COMMENT '�Ƿ�ɾ�� 0ɾ�� 1����',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
