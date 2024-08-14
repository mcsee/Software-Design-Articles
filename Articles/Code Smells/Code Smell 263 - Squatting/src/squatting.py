def create_bucket(account_id, region):
    bucket_name = f"aws-glue-assets-{account_id}-{region}"
    create_s3_bucket(bucket_name)  
   # This is deterministic and open