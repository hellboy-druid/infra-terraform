import os
import sys
from infra_terraform.terraform import Terraform

def main():
    # Set the root directory of the Terraform project
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    # Create a Terraform object
    terraform = Terraform(root_dir)

    # Initialize the Terraform project
    terraform.init()

    # Get the current Terraform working directory
    cwd = terraform.cwd

    # Get the Terraform configuration files
    config_files = terraform.config_files

    # Get the Terraform state files
    state_files = terraform.state_files

    # Check if the Terraform configuration files exist
    if not config_files:
        print("No Terraform configuration files found.")
        sys.exit(1)

    # Check if the Terraform state files exist
    if not state_files:
        print("No Terraform state files found.")
        sys.exit(1)

    # Check if the Terraform configuration files are up-to-date
    if not terraform.is_up_to_date():
        print("Terraform configuration files are not up-to-date.")
        sys.exit(1)

    # Initialize the Terraform provider
    terraform.provider_init()

    # Apply the Terraform configuration
    terraform.apply()

if __name__ == "__main__":
    main()