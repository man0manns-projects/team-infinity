USE [master]
GO
/****** Object:  Database [application]    Script Date: 11/21/2022 12:57:15 AM ******/
CREATE DATABASE [application]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'application', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\application.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'application_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\application_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [application] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [application].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [application] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [application] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [application] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [application] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [application] SET ARITHABORT OFF 
GO
ALTER DATABASE [application] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [application] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [application] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [application] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [application] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [application] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [application] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [application] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [application] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [application] SET  DISABLE_BROKER 
GO
ALTER DATABASE [application] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [application] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [application] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [application] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [application] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [application] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [application] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [application] SET RECOVERY FULL 
GO
ALTER DATABASE [application] SET  MULTI_USER 
GO
ALTER DATABASE [application] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [application] SET DB_CHAINING OFF 
GO
ALTER DATABASE [application] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [application] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [application] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [application] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'application', N'ON'
GO
ALTER DATABASE [application] SET QUERY_STORE = OFF
GO
USE [application]
GO
/****** Object:  User [API-Connector]    Script Date: 11/21/2022 12:57:15 AM ******/
CREATE USER [API-Connector] FOR LOGIN [API-Connector] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_datareader] ADD MEMBER [API-Connector]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [API-Connector]
GO
/****** Object:  Table [dbo].[bankaccounts]    Script Date: 11/21/2022 12:57:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[bankaccounts](
	[user_id] [int] NULL,
	[routing_number] [varchar](20) NULL,
	[account_number] [varchar](20) NULL,
	[nickname] [varchar](255) NULL,
	[transaction_id] [varchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cards]    Script Date: 11/21/2022 12:57:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cards](
	[user_id] [int] NULL,
	[card_number] [varchar](20) NULL,
	[security_code] [varchar](5) NULL,
	[cardholder_name] [varchar](50) NULL,
	[expiration_date] [varchar](4) NULL,
	[nickname] [varchar](255) NULL,
	[transaction_id] [varchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[donations]    Script Date: 11/21/2022 12:57:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[donations](
	[donor_id] [int] IDENTITY(1000,1) NOT NULL,
	[user_id] [int] NULL,
	[fundraiser_id] [int] NULL,
	[donation_amt] [decimal](38, 2) NULL,
	[payment_id] [int] NULL,
	[notes] [varchar](100) NULL,
	[street_address] [varchar](50) NULL,
	[city_town] [varchar](50) NULL,
	[zipcode] [int] NULL,
	[country] [varchar](20) NULL,
	[phone] [char](10) NULL,
	[email_address] [varchar](50) NULL,
	[transaction_id] [varchar](100) NULL,
	[f_name] [char](20) NULL,
	[l_name] [char](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[donor_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[fundraisers]    Script Date: 11/21/2022 12:57:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[fundraisers](
	[fundraiser_id] [int] IDENTITY(500,1) NOT NULL,
	[title] [varchar](100) NULL,
	[txt_description] [varchar](500) NULL,
	[amount_raised] [decimal](38, 2) NULL,
	[goal] [decimal](38, 2) NULL,
	[user_id] [int] NULL,
	[image] [varbinary](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[fundraiser_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 11/21/2022 12:57:15 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[user_id] [int] IDENTITY(0,1) NOT NULL,
	[f_name] [char](20) NULL,
	[l_name] [char](20) NULL,
	[email_address] [varchar](200) NULL,
	[password] [char](40) NULL,
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [application] SET  READ_WRITE 
GO
